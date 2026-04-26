import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSampleRecords from '../reducers/sample-record.reducer';
import { LoadingState, getError } from 'src/app/modules/core/utils/call-state';

const getSampleRecordsState = createFeatureSelector<fromSampleRecords.State>(
    fromSampleRecords.sampleRecordsFeatureKey
);

export const selectSampleRecordList = createSelector(
    getSampleRecordsState,
    state => state.data
);

export const getSampleRecordsError = createSelector(
    getSampleRecordsState,
    state => getError(state.callState)
);

export const sampleRecordsIsLoading = createSelector(
    getSampleRecordsState,
    state => state.callState === LoadingState.LOADING
);

export const sampleRecordsIsLoaded = createSelector(
    getSampleRecordsState,
    state => state.callState === LoadingState.LOADED
);


