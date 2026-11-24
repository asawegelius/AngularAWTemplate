import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const host = 'localhost';
const windows = process.platform === 'win32';
const stopping = new AbortController();

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => stopping.abort(new Error(`Smoke check interrupted by ${signal}`)));
}

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once('error', reject);
    probe.listen(port, host, () => probe.close(resolve));
  });
}

function signalGroup(pid, signal) {
  try {
    process.kill(-pid, signal);
    return true;
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
    return false;
  }
}

async function stopServer(child) {
  if (!child.pid) return;

  if (windows) {
    const result = spawnSync('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], {
      encoding: 'utf8',
      timeout: 5000
    });
    if (result.error) throw result.error;
    if (result.status !== 0 && child.exitCode === null && child.signalCode === null) {
      throw new Error(`Could not stop server process tree ${child.pid}. ${result.stderr.trim()}`);
    }
  } else if (signalGroup(child.pid, 'SIGTERM')) {
    await delay(1000);
    signalGroup(child.pid, 'SIGKILL');
  }
}

async function withServer(script, port, path, args, verify) {
  stopping.signal.throwIfAborted();
  await checkPort(port);

  const child = spawn(process.execPath, [process.env.npm_execpath, 'run', script, ...args], {
    detached: !windows,
    stdio: ['ignore', 'inherit', 'inherit']
  });
  let spawnError;
  child.once('error', error => { spawnError = error; });

  const url = `http://${host}:${port}${path}`;
  const deadline = performance.now() + 90_000;

  try {
    while (performance.now() < deadline) {
      stopping.signal.throwIfAborted();
      if (spawnError) throw spawnError;
      if (child.exitCode !== null || child.signalCode !== null) {
        throw new Error(`npm run ${script} exited before readiness (${child.exitCode ?? child.signalCode})`);
      }

      const signal = AbortSignal.any([stopping.signal, AbortSignal.timeout(2000)]);
      const response = await fetch(url, { signal }).catch(error => {
        if (error.name === 'TimeoutError' || error.cause?.code === 'ECONNREFUSED') return;
        throw error;
      });
      if (response?.ok) {
        await verify(response);
        console.log(`Verified ${url} for npm run ${script}`);
        return;
      }

      await response?.body?.cancel();
      await delay(250, undefined, { signal: stopping.signal });
    }
    throw new Error(`Timed out waiting for npm run ${script} at ${url}`);
  } finally {
    await stopServer(child);
  }
}

function checkAngular(script, port) {
  return withServer(script, port, '/sample-records', ['--', '--host', host, '--port', String(port)], async response => {
    assert.match(await response.text(), /<app-root><\/app-root>/);
  });
}

const db = JSON.parse(await readFile(new URL('../mock-api/db.json', import.meta.url), 'utf8'));

await checkAngular('start', 4200);
await withServer('mock:api', 3000, '/sample-records', [], async response => {
  const records = await response.json();
  assert.ok(Array.isArray(records) && records.length > 0, 'The mock API should serve sample records');
  assert.deepEqual(records, db['sample-records']);
  await checkAngular('mock', 4201);
});
