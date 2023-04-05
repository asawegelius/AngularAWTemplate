import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from '../reducers/customer.reducer';
import { LoadingState, getError } from 'src/app/modules/core/utils/call-state';

const getCustomerState = createFeatureSelector<fromCustomers.State>(
    fromCustomers.customerFeatureKey
);

export const selectCustomerList = createSelector(
    getCustomerState,
    state => state.data
);

export const getCustomersError = createSelector(
    getCustomerState,
    state => getError(state.callState)
);

export const customersIsLoading = createSelector(
    getCustomerState,
    state => state.callState === LoadingState.LOADING
);

export const customersIsLoaded = createSelector(
    getCustomerState,
    state => state.callState === LoadingState.LOADED
);


