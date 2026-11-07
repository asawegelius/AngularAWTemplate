import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { RouterState } from '../routing/router-serializer';

/**
 * Root infrastructure state. Business state is registered by feature routes.
 */
export interface State {
  router: fromRouter.RouterReducerState<RouterState>;
}

/**
 * Defines the mapping of reducers for the entire application.
 */
export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

/**
 * An array of meta reducers for the entire application.
 * These are functions that can modify the behavior of the reducers.
 */
export const metaReducers: MetaReducer<State>[] = [];
