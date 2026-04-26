# AngularAWTemplate

AngularAWTemplate is an Angular 20 template for enterprise-style applications. It is designed for larger, long-lived systems where consistency, explicit structure, and maintainable feature patterns matter more than minimal setup.

The template is intentionally opinionated:

- standalone Angular application bootstrap
- route-based lazy loading
- Angular Material for UI building blocks
- NgRx Store, Effects, Entity, Router Store, and DevTools for application state
- Vitest-based unit testing
- a mock API workflow for local development

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

- Node.js `^22.12.0 || ^24.0.0`
- npm `>=10`

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development application with `npm run start`.

If you want to run the mock API locally as well:

1. Start the mock backend with `npm run mock:api`.
2. Start the Angular app against the mock environment with `npm run mock`.

## Available Scripts

- `npm run start`
  Runs the Angular app with the `development` configuration.
- `npm run mock`
  Runs the Angular app with the `mock` configuration.
- `npm run mock:api`
  Starts `json-server` with the data in `mock-api/db.json`.
- `npm run build`
  Creates a production build.
- `npm run watch`
  Runs a development build in watch mode.
- `npm run test`
  Runs the Angular unit-test target.
- `npm run test:ci`
  Runs the unit-test suite once without watch mode.
- `npm run compodoc`
  Generates the static documentation site in `documentation/`.

## Architecture

The template uses Angular's standalone application model rather than root `NgModule` bootstrap.

- Application bootstrap is configured in `src/app/app.config.ts`.
- Top-level routes are defined in `src/app/app.routes.ts`.
- Feature routes are lazy-loaded and can register their own providers, state, and effects.
- Shared UI building blocks are also standalone components instead of wrapper modules.

The current sample feature lives under `src/app/modules/features/sample-records` and demonstrates the default architectural direction of the template.

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

- `src/app/modules/features/sample-records/state/reducers/sample-record.reducer.ts`
- `src/app/modules/features/sample-records/state/effects/sample-record.effects.ts`
- `src/app/modules/features/sample-records/state/selectors/sample-record.selectors.ts`
- `src/app/modules/features/sample-records/state/sample-records.facade.ts`

The app also includes root NgRx setup in `src/app/app.config.ts`, including router-store integration and devtools.

## API Layer

The API layer is intentionally simple and explicit.

- `src/app/modules/core/features/API/services/api-url.service.ts` joins the configured API base URL with endpoint paths.
- `src/app/modules/core/features/API/utils/endpoints.ts` contains endpoint constants.
- `src/app/modules/core/features/API/services/resource.service.ts` provides reusable CRUD-style behavior for feature API services.

The sample feature API service shows the intended usage:

- `src/app/modules/features/sample-records/services/sample-record-api.service.ts`

Example pattern:

```ts
@Injectable({
  providedIn: 'root'
})
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

The current local desktop environment can require elevated execution for Angular build and test commands because of a local `spawn EPERM` issue. That is an environment limitation, not a project-level requirement.

## Generated Documentation

Static API and architecture documentation is generated with Compodoc.

- Source: TypeScript files included by `tsconfig.doc.json`
- Output: `documentation/`
- Command: `npm run compodoc`

The `documentation` folder is generated output and should be refreshed when the public project structure changes significantly.

## Deployment

Build the application with:

```bash
npm run build
```

The production output is written to:

- `dist/AngularTemplate`

Deploy the contents of that folder to your web server or hosting platform.

## License

AngularAWTemplate is licensed under the MIT License.
