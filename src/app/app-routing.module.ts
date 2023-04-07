import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Represents the routes of the application.
 * Each route contains the path to the feature module's route configuration.
 * @constant {Routes}
 * */
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./modules/features/customers/customers-routing.module').then(m => m.CustomersRoutingModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/features/accounts/accounts.module').then(m => m.AccountsModule)
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
