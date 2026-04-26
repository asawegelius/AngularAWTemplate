import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AccountsPageComponent } from './components/accounts-page/accounts-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ModalModule } from '../../shared/features/modal/modal.module';



@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountsPageComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AccountsRoutingModule,
    ModalModule
  ],
  exports: [
    AccountDetailsComponent
  ]
})
export class AccountsModule { }
