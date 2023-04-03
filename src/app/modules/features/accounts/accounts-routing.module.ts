import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AccountsRoutingModule { }
