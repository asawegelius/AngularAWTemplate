import { NgModule } from '@angular/core';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AccountsPageComponent } from './components/accounts-page/accounts-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';



@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountsPageComponent,
    AccountsComponent,
  ],
  imports: [
    MatButtonModule,
    MatButtonModule,
    AccountsRoutingModule,
    SharedModule
  ],
  exports: [
    AccountDetailsComponent
  ]
})
export class AccountsModule { }
