import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsPageComponent } from './components/accounts-page/accounts-page.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPageComponent
  },
  {
    path: 'account-details',
    outlet: 'modal',
    component: AccountDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AccountsRoutingModule { }
