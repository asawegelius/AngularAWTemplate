import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCustomer from './reducers/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './effects/customer.effects';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CustomersComponent,
    CustomersPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    EffectsModule.forFeature([CustomerEffects])
  ]
})
export class CustomersModule { }
