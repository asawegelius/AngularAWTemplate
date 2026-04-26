import { Action, createReducer, on } from '@ngrx/store';
import { SampleRecord } from '../../models/sample-record.interface';
import * as SampleRecordActions from '../actions/sample-record.actions';
import { IState, LoadingState } from 'src/app/modules/core/utils/call-state';

/**
 * Reducer function for managing the sample-record state.
 * @function
 * @param {State} state - The current state.
 * @param {Action} action - The current action.
 * @returns {State} The new state.
 */
export function reducer(state: State, action: Action) {
  return sampleRecordsReducer(state, action);
}

/**
 * The key for the sample-record feature state.
 * @constant {string}
 */
export const sampleRecordsFeatureKey = 'sampleRecords';

/**
 * The initial state for the sample-record feature state.
 * @constant {State}
 */
export const initialState: State = {
  data: [],
  callState: LoadingState.INIT
};

/**
 * Interface for the sample-record feature state.
 * @interface
 * @extends {IState<SampleRecord[]>}
 */
export interface State extends IState<SampleRecord[]> {
}

/**
 * Reducer function for managing the sample-record state.
 * Uses the createReducer function from @ngrx/store to generate the reducer.
 * @constant {Reducer<State>} sampleRecordsReducer
 */
export const sampleRecordsReducer = createReducer(
  initialState, on(
    SampleRecordActions.loadSampleRecords,
    (state) => ({ ...state, callState: LoadingState.LOADING })
  ),
  on(
    SampleRecordActions.loadSampleRecordsSuccess,
    (state, { data }) => ({
      ...state,
      data,
      callState: LoadingState.LOADED
    })
  ),
  on(
    SampleRecordActions.loadSampleRecordsFailure,
    (state, { errorMsg }) => ({
      ...state,
      callState: { errorMsg }
    })
  )
);

