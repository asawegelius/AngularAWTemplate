import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./modules/features/customers/customers-routing.module').then(m => m.CustomersRoutingModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/features/accounts/accounts-routing.module').then(m => m.AccountsRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
