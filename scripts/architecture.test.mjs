import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const fixtures = {
  'app.routes.ts': `export const loadFeature = () => import('./features/feature-a/local');`,
  'core/value.ts': `export type CoreValue = number; export const coreValue: CoreValue = 1;`,
  'core/consumer.ts': `
    export { layoutValue } from '../layout/value';
    export const loadFeature = () => import('../features/feature-a/local');`,
  'layout/value.ts': `export const layoutValue = 2;`,
  'shared/value.ts': `export const sharedValue = 3;`,
  'shared/consumer.ts': `export type { CoreValue } from '@core/value';`,
  'features/feature-a/local.ts': `export const localValue = 4;`,
  'features/feature-a/consumer.ts': `
    import { coreValue } from '@core/value';
    import { sharedValue } from '@shared/value';
    import { localValue } from './local';
    import { otherValue } from '../feature-b/value';
    export const total = coreValue + sharedValue + localValue + otherValue;`,
  'features/feature-b/value.ts': `export const otherValue = 5;`
};

let workspace;
let report;

before(async () => {
  const tempRoot = fileURLToPath(new URL('../tmp/', import.meta.url));
  await mkdir(tempRoot, { recursive: true });
  workspace = await mkdtemp(join(tempRoot, 'architecture-'));
  for (const [relativePath, contents] of Object.entries(fixtures)) {
    const path = join(workspace, 'src', 'app', relativePath);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, contents);
  }

  await copyFile(new URL('../tsconfig.json', import.meta.url), join(workspace, 'tsconfig.json'));

  const config = fileURLToPath(new URL('../.dependency-cruiser.cjs', import.meta.url));
  const cli = fileURLToPath(new URL('../node_modules/dependency-cruiser/bin/dependency-cruiser.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [cli, '--config', config, '--output-type', 'json', 'src'], {
    cwd: workspace,
    encoding: 'utf8',
    timeout: 30_000
  });
  report = JSON.parse(output);
});

after(async () => {
  if (workspace) await rm(workspace, { recursive: true, force: true });
});

const cases = [
  ['rejects imports between features', 'features/feature-a/consumer.ts', 'features/feature-b/value.ts', 'features-depend-on-core-and-shared'],
  ['rejects type-only re-exports from shared to core', 'shared/consumer.ts', 'core/value.ts', 'shared-is-independent'],
  ['rejects re-exports from core to layout', 'core/consumer.ts', 'layout/value.ts', 'core-depends-on-infrastructure-only'],
  ['rejects lazy imports from core to features', 'core/consumer.ts', 'features/feature-a/local.ts', 'core-depends-on-infrastructure-only'],
  ['accepts imports from features to core', 'features/feature-a/consumer.ts', 'core/value.ts'],
  ['accepts imports from features to shared', 'features/feature-a/consumer.ts', 'shared/value.ts'],
  ['accepts imports within a feature', 'features/feature-a/consumer.ts', 'features/feature-a/local.ts'],
  ['accepts lazy imports from application routes to features', 'app.routes.ts', 'features/feature-a/local.ts']
];

for (const [name, from, to, rule] of cases) {
  test(name, () => {
    const source = report.modules.find(module => module.source === `src/app/${from}`);
    const dependency = source?.dependencies.find(edge => edge.resolved === `src/app/${to}`);
    assert.ok(dependency, `Expected dependency from ${from} to ${to} in the report`);
    assert.equal(dependency.valid, rule === undefined);
    if (rule) {
      assert.ok(dependency.rules.some(violation => violation.name === rule && violation.severity === 'error'),
        `Expected ${rule} to reject ${from} → ${to}`);
    }
  });
}
