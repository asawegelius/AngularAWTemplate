import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCustomer from './state/reducers/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './state/effects/customer.effects';
import { CustomersPageComponent } from './components/customers-page/customers-page.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { TableWithEditCellModule } from '../../shared/components/tables/table-with-edit-cell/table-with-edit-cell.module';



@NgModule({
  declarations: [
    CustomersComponent,
    CustomersPageComponent
  ],
  imports: [
    CommonModule,
    TableWithEditCellModule,
    CustomersRoutingModule,
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    EffectsModule.forFeature([CustomerEffects])
  ]
})
export class CustomersModule { }
