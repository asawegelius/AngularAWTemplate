const application = '^src/(?:app/|main\\.[jt]s$)';

module.exports = {
  forbidden: [
    {
      name: 'core-depends-on-infrastructure-only',
      severity: 'error',
      from: { path: '^src/app/core/' },
      to: { path: application, pathNot: '^src/app/core/' }
    },
    {
      name: 'shared-is-independent',
      severity: 'error',
      from: { path: '^src/app/shared/' },
      to: { path: application, pathNot: '^src/app/shared/' }
    },
    {
      name: 'layout-depends-on-core-and-shared',
      severity: 'error',
      from: { path: '^src/app/layout/' },
      to: { path: application, pathNot: '^src/app/(?:layout|core|shared)/' }
    },
    {
      name: 'features-depend-on-core-and-shared',
      severity: 'error',
      from: { path: '^src/app/features/([^/]+)/' },
      to: { path: application, pathNot: '^src/app/(?:features/$1|core|shared)/' }
    },
    {
      name: 'source-imports-resolve',
      severity: 'error',
      from: { path: '^src/' },
      to: { couldNotResolve: true }
    }
  ],
  options: {
    doNotFollow: { path: '(^|/)node_modules/' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types']
    },
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true
  }
};
