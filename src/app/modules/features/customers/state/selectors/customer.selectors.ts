import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from '../reducers/customer.reducer';

const getCustomerState = createFeatureSelector<fromCustomers.State>(
    fromCustomers.customerFeatureKey
);

export const selectCustomerList = createSelector(
    getCustomerState,
    state => state.customers
)

export const selectCustomersError = createSelector(
    getCustomerState,
    state => state.error
)

export const selectCustomersIsLoading = createSelector(
    getCustomerState,
    state => state.isLoading
)

export const selectAppComponentViewModel = createSelector(
    selectCustomerList,
    selectCustomersError,
    getCustomerState,
    (customers, error, loading) => ({
        customers,
        error,
        loading
    })
);

