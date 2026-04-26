import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { SampleRecord } from '../../models/sample-record.interface';
import * as SampleRecordActions from '../actions/sample-record.actions';
import { CallState, LoadingState, getError } from 'src/app/modules/core/utils/call-state';

/**
 * The key for the sample-record feature state.
 * @constant {string}
 */
export const sampleRecordsFeatureKey = 'sampleRecords';

export const sampleRecordAdapter = createEntityAdapter<SampleRecord>();
const sampleRecordSelectors = sampleRecordAdapter.getSelectors();

/**
 * The initial state for the sample-record feature state.
 * @constant {State}
 */
export const initialState: State = {
  ...sampleRecordAdapter.getInitialState({ callState: LoadingState.INIT }),
};

/**
 * Interface for the sample-record feature state.
 * @interface
 */
export interface State extends EntityState<SampleRecord> {
  callState: CallState;
}

/**
 * Reducer function for managing the sample-record state.
 * Uses the createReducer function from @ngrx/store to generate the reducer.
 * @constant {Reducer<State>} sampleRecordsReducer
 */
export const sampleRecordsReducer = createReducer(
  initialState,
  on(
    SampleRecordActions.loadSampleRecords,
    (state) => ({ ...state, callState: LoadingState.LOADING })
  ),
  on(
    SampleRecordActions.loadSampleRecordsSuccess,
    (state, { data }) =>
      sampleRecordAdapter.setAll(data, {
        ...state,
        callState: LoadingState.LOADED
      })
  ),
  on(
    SampleRecordActions.loadSampleRecordsFailure,
    (state, { errorMsg }) => ({
      ...state,
      callState: { errorMsg }
    })
  ),
);

export const sampleRecordsFeature = createFeature({
  name: sampleRecordsFeatureKey,
  reducer: sampleRecordsReducer,
  extraSelectors: ({ selectCallState, selectSampleRecordsState }) => ({
    selectSampleRecordIds: createSelector(
      selectSampleRecordsState,
      (state) => sampleRecordSelectors.selectIds(state)
    ),
    selectSampleRecordEntities: createSelector(
      selectSampleRecordsState,
      (state) => sampleRecordSelectors.selectEntities(state)
    ),
    selectSampleRecordList: createSelector(
      selectSampleRecordsState,
      (state) => sampleRecordSelectors.selectAll(state)
    ),
    selectSampleRecordTotal: createSelector(
      selectSampleRecordsState,
      (state) => sampleRecordSelectors.selectTotal(state)
    ),
    getSampleRecordsError: createSelector(selectCallState, getError),
    sampleRecordsIsLoading: createSelector(
      selectCallState,
      (callState) => callState === LoadingState.LOADING
    ),
    sampleRecordsIsLoaded: createSelector(
      selectCallState,
      (callState) => callState === LoadingState.LOADED
    ),
  }),
});

export const {
  reducer,
  selectCallState,
  selectSampleRecordsState,
  selectSampleRecordIds,
  selectSampleRecordEntities,
  selectSampleRecordList,
  selectSampleRecordTotal,
  getSampleRecordsError,
  sampleRecordsIsLoading,
  sampleRecordsIsLoaded,
} = sampleRecordsFeature;

