import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersPageComponent } from '../customers/pages/customers-page/customers-page.component';
import { CustomersComponent } from '../customers/components/customers/customers.component';



@NgModule({
  declarations: [
    CustomersPageComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountsModule { }
