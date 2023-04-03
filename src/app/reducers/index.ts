import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as custReducer from '../modules/features/customers/reducers/customer.reducer';



export interface State {
  router: fromRouter.RouterReducerState<any>;
  [custReducer.customerFeatureKey]: custReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [custReducer.customerFeatureKey]: custReducer.customersReducer
};




export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
