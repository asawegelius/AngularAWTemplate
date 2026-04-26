import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Represents the routes of the application.
 * Each route contains the path to the feature module's route configuration.
 * @constant {Routes}
 * */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sample-records'
  },
  {
    path: 'sample-records',
    loadChildren: () => import('./modules/features/sample-records/sample-records.module').then(m => m.SampleRecordsModule)
  },
  {
    path: '**',
    redirectTo: 'sample-records'
  }
];

/**
 * NgModule that declares the application's routing configuration.
 */
@NgModule({
  /**
  * Configures the router with the provided routes.
  */
  imports: [RouterModule.forRoot(routes)],
  /**
  * Export the configured router module to make it available for use in other modules.
  */
  exports: [RouterModule]
})
export class AppRoutingModule { }
