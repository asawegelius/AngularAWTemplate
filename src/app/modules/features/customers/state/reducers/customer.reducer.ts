import { Action, createReducer, on } from '@ngrx/store';
import { ICustomer } from '../../models/customer.interface';
import * as CustomerActions from '../actions/customer.actions'
import { IState, LoadingState } from 'src/app/modules/core/utils/call-state';

/**
 * Reducer function for managing the customer-related state.
 * @function
 * @param {State} state - The current state.
 * @param {Action} action - The current action.
 * @returns {State} The new state.
 */
export function reducer(state: State, action: Action) {
  return customersReducer(state, action);
}

/**
 * The key for the customer feature state.
 * @constant {string}
 */
export const customerFeatureKey = 'customer';

/**
 * The initial state for the customer feature state.
 * @constant {State}
 */
export const initialState: State = {
  data: [],
  callState: LoadingState.INIT
};

/**
 * Interface for the customer feature state.
 * @interface
 * @extends {IState<ICustomer[]>}
 */
export interface State extends IState<ICustomer[]> {
}

/**
 * Reducer function for managing the customer-related state.
 * Uses the createReducer function from @ngrx/store to generate the reducer.
 * @constant {Reducer<State>} customersReducer
 */
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

