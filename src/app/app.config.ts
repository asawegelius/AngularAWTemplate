import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { APP_ROUTES } from './app.routes';
import { reducers, metaReducers } from '@core/state/app-state';
import { RouterSerializer } from '@core/routing/router-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withXhr()),
    provideAnimations(),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideEffects(),
    provideRouterStore({
      serializer: RouterSerializer,
    }),
  ]
};
