import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as custReducer from '../modules/features/customers/state/reducers/customer.reducer';

/**
 * Defines the shape of the state for the entire application.
 */
export interface State {
  router: fromRouter.RouterReducerState<any>;
  [custReducer.customerFeatureKey]: custReducer.State;
}

/**
 * Defines the mapping of reducers for the entire application.
 */
export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [custReducer.customerFeatureKey]: custReducer.customersReducer
};

/**
 * An array of meta reducers for the entire application.
 * These are functions that can modify the behavior of the reducers.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
