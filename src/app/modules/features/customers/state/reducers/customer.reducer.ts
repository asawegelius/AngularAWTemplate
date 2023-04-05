import { Action, createReducer, on } from '@ngrx/store';
import { ICustomer } from '../../models/customer.interface';
import * as CustomerActions from '../actions/customer.actions'
import { IState, LoadingState } from 'src/app/modules/core/utils/call-state';


export const customerFeatureKey = 'customer';

export interface State extends IState<ICustomer[]> {
}

export const initialState: State = {
  data: [],
  callState: LoadingState.INIT
};


export const customersReducer = createReducer(
  initialState, on(
    CustomerActions.loadCustomers,
    (state) => ({ ...state, callState: LoadingState.LOADING })
  ),
  on(
    CustomerActions.loadCustomersSuccess,
    (state, { data }) => ({
      ...state,
      data,
      callState: LoadingState.LOADED
    })
  ),
  on(
    CustomerActions.loadCustomersFailure,
    (state, { errorMsg }) => ({
      ...state,
      callState: errorMsg
    })
  )
);

export function reducer(state: State, action: Action) {
  return customersReducer(state, action);
}

