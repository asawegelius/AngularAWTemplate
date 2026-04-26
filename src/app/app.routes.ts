import { Routes } from '@angular/router';

/**
 * Represents the routes of the application.
 * Each route contains the path to the feature route configuration.
 * @constant {Routes}
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sample-records'
  },
  {
    path: 'sample-records',
    loadChildren: () => import('./modules/features/sample-records/sample-records.routes').then(m => m.SAMPLE_RECORDS_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'sample-records'
  }
];
