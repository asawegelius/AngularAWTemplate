import { createAction, props } from '@ngrx/store';
import { ICustomer } from '../../models/customer.interface';

export const loadCustomers = createAction(
  '[Customer] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ data: ICustomer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ errorMsg: any }>()
);
