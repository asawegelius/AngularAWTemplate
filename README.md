# AngularAWTemplate

AngularAWTemplate is an Angular 22 template for enterprise-style applications. It is designed for larger, long-lived systems where consistency, explicit structure, and maintainable feature patterns matter more than minimal setup.

The template is intentionally opinionated:

- standalone Angular application bootstrap
- route-based lazy loading
- Angular Material 22 for UI building blocks
- NgRx 22 Store, Effects, Entity, Router Store, and DevTools for application state
- TypeScript 6 and Vitest 5
- a mock API workflow using json-server 0.17

## Table of Contents

- [AngularAWTemplate](#angularawtemplate)
- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Testing](#testing)
- [Generated Documentation](#generated-documentation)
- [Deployment](#deployment)
- [License](#license)

## Requirements

- Node.js `^22.22.3 || ^24.15.0`
- npm `>=10`

## Getting Started

1. Clone the repository.
2. Install locked dependencies with `npm ci`.
3. Start the development application with `npm run start` and open `http://localhost:4200`. The development environment expects an API at `http://localhost:8080`.

For the mock workflow, stop the development server and run these commands in separate terminals.

1. Start the mock backend with `npm run mock:api`. It serves the fixture at `http://localhost:3000/sample-records`.
2. Start the Angular app with `npm run mock` and open `http://localhost:4200`.

## Available Scripts

- `npm run start`
  Runs the Angular app with the `development` configuration.
- `npm run mock`
  Runs the Angular app with the `mock` configuration.
- `npm run mock:api`
  Starts `json-server` with the data in `mock-api/db.json`.
- `npm run smoke:startup`
  Checks that both Angular servers respond and the mock API returns the sample records. The check starts and stops its own processes and needs ports 3000, 4200, and 4201 available.
- `npm run build`
  Creates a production build.
- `npm run ng -- extract-i18n --output-path dist/i18n`
  Extracts translation messages into `dist/i18n/messages.xlf`.
- `npm run watch`
  Runs a development build in watch mode.
- `npm run test`
  Runs the Angular unit-test target.
- `npm run test:ci`
  Runs the unit-test suite once without watch mode.
- `npm run check:architecture`
  Checks the application dependency rules.
- `npm run compodoc`
  Generates the static documentation site in `documentation/`.

## Architecture

The template uses Angular's standalone application model and organizes code by responsibility and feature area. The structure is inspired by [Angular Best Practice File Structure Principles 2026](https://medium.com/@bolik/angular-best-practice-file-structure-principles-2026-41f1d1383cda).

- Application bootstrap is configured in `src/app/app.config.ts`.
- Top-level routes are defined in `src/app/app.routes.ts`.
- Feature routes are lazy-loaded and can register their own providers, state, and effects.
- Shared UI building blocks are also standalone components instead of wrapper modules.

```text
src/app/
  core/                              # Application-wide infrastructure
    config/app-config.ts             # Typed APP_CONFIG injection token
    http/                            # API URLs, reusable HTTP access, call state
    routing/                         # Router state serialization
    state/app-state.ts               # Root infrastructure reducers
  shared/                            # Reusable presentation code
    components/tables/               # Table components, models and data source
  layout/                            # Application shell and navigation
    side-navigation/
    footer/
  features/
    sample-records/
      pages/sample-records-page/      # Routed container using the facade
      components/sample-records/     # Feature UI and its table data source
      data-access/                   # Feature API client and endpoint paths
      models/                        # Feature data contracts
      state/                         # NgRx actions, reducer, selectors and effects
      facade/                        # Component-facing feature API
      testing/                       # Feature test fixtures
      sample-records.routes.ts       # Feature providers, state and effects
  app.component.*
  app.config.ts
  app.routes.ts
```

Dependency rules

- `core/` contains infrastructure shared across the application. It can use other core files and environment configuration.
- `shared/` contains presentation components and their supporting types and is independent of the other application layers.
- `features/` owns business-specific code. Each feature can use its own files, `core/`, and `shared/`.
- `layout/` owns the application shell, navigation links, and footer. It can use core and shared building blocks. The router outlet renders feature screens.
- `src/main.ts` and files directly in `src/app/` compose the layers and are entry points. `app.routes.ts` lazy-loads each feature's route configuration.

Use `@core/*` and `@shared/*` for imports across layers, and relative imports within a feature or layer. Keep tests beside the code they exercise. Related table models and the generic table data source live with the table UI instead of in global `models/` or `services/` folders.

Run `npm run check:architecture` locally. The `architecture` CI job runs the same command. Dependency Cruiser resolves TypeScript aliases and relative paths and checks static imports, literal dynamic imports, re-exports, and type-only imports, including imports in tests.

Each new directory under `src/app/features/` automatically gets its own boundary. To introduce a new layer or an explicit public interface between features, update the dependency rules here and in `.dependency-cruiser.cjs` together.

When adding a feature, start with its route file and routed page. Add `data-access/`, `state/`, `facade/`, and other folders as responsibilities appear. Register feature services, state, and effects in the feature routes. Add infrastructure areas such as `core/auth/` or `core/access/` when the application needs them.

## State Management

This template is intended for enterprise applications, so NgRx remains the primary state-management approach.

The sample feature demonstrates a layered NgRx pattern:

- actions for explicit event flow
- effects for async orchestration
- `createFeature` for feature registration
- `@ngrx/entity` for collection state
- selectors for read models
- a facade for component-facing state access

Relevant files:

- `src/app/features/sample-records/state/sample-record.reducer.ts`
- `src/app/features/sample-records/state/sample-record.effects.ts`
- `src/app/features/sample-records/state/sample-record.selectors.ts`
- `src/app/features/sample-records/facade/sample-records.facade.ts`

The app also includes root NgRx setup in `src/app/app.config.ts`, including router-store integration and devtools. Root infrastructure state lives in `core/state/app-state.ts`; business state stays in its feature. The sample API client and facade are provided by the lazy feature route, while each sample table component provides its own table data source.

## API Layer

The API layer is intentionally simple and explicit.

- `src/app/core/config/app-config.ts` exposes the typed `APP_CONFIG` token, defaulting to the selected environment's API URL. Override the token in application providers to supply runtime settings.
- `src/app/core/http/api-url.service.ts` joins the configured API base URL with endpoint paths.
- `src/app/core/http/resource.service.ts` provides reusable CRUD-style behavior for feature API services.
- Feature endpoint constants live in their own `data-access/` folder so core has no knowledge of business resources.

The sample feature API service shows the intended usage:

- `src/app/features/sample-records/data-access/sample-record-api.service.ts`

Example pattern:

```ts
// Register ProductApiService in the product feature's route providers.
@Injectable()
export class ProductApiService extends ResourceService<Product> {
  constructor(
    protected httpClient: HttpClient,
    private apiUrl: ApiUrlService
  ) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return this.apiUrl.create('products');
  }
}
```

## Testing

The template uses Angular's unit-test target with Vitest as the test runner.

- Run all tests once with `npm run test:ci`
- Run tests in watch mode with `npm run test`

`src/app/app.routes.spec.ts` exercises the lazy feature with the real route providers, NgRx state and effects, and a mocked HTTP backend. It covers default and fallback redirects, record rendering, and API failures.

## Generated Documentation

Static API and architecture documentation is generated with Compodoc 2.

- Source: TypeScript files included by `tsconfig.doc.json`
- Output: `documentation/`
- Command: `npm run compodoc`

The `documentation` folder is generated output and should be refreshed when the public project structure changes significantly.

## Deployment

Build the application with:

```bash
npm run build
```

The production build fetches the Google Fonts stylesheets referenced in `src/index.html` for inlining.

The production output is written to:

- `dist/AngularTemplate`

Deploy the contents of that folder to your web server or hosting platform.

## License

The repository contains the GNU General Public License version 3 text. Previous versions of this README stated MIT, and the npm package metadata has no `license` field. The intended license is pending maintainer confirmation. [License file](LICENSE)
