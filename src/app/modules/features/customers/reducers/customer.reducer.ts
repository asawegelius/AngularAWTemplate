import { Action, createReducer, on } from '@ngrx/store';
import { ICustomer } from '../models/customer.interface';
import * as CustomerActions from '../actions/customer.actions'


export const customerFeatureKey = 'customer';

export interface State {
  customers: ICustomer[];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  customers: [],
  isLoading: false,
  error: ''
};


export const customersReducer = createReducer(
  initialState, on(
    CustomerActions.loadCustomers,
    (state) => ({ ...state, isLoading: true, error: '' })
  ),
  on(
    CustomerActions.loadCustomersSuccess,
    (state, { customers }) => ({
      ...state,
      customers,
      isLoading: false
    })
  ),
  on(
    CustomerActions.loadCustomersFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return customersReducer(state, action);
}

