
import { LoadingState } from 'src/app/modules/core/utils/call-state';
import { MockSampleRecord } from '../mock-models';
import { getSampleRecordsError, sampleRecordsIsLoaded, sampleRecordsIsLoading, selectSampleRecordList } from './sample-record.selectors';
import { initialState, sampleRecordAdapter, State } from '../reducers/sample-record.reducer';

describe('Sample record selectors', () => {
  const mockSampleRecord = new MockSampleRecord();
  const loadingState = {
    ...initialState,
    callState: LoadingState.LOADING
  } as State;
  const loadedState = sampleRecordAdapter.setAll([mockSampleRecord], {
    ...initialState,
    callState: LoadingState.LOADED
  });
  const failedState = {
    ...initialState,
    callState: { errorMsg: 'some error' }
  } as State;

  it('should select the sample record list', () => {
    const result = selectSampleRecordList.projector(loadedState);
    expect(result).toEqual([mockSampleRecord]);
  });

  it('should return null when there is no sample-record error', () => {
    const result = getSampleRecordsError.projector(loadedState.callState);
    expect(result).toBeNull();
  });

  it('should select the sample-record error', () => {
    const result = getSampleRecordsError.projector(failedState.callState);
    expect(result).toBe('some error');
  });

  it('should tell if sample records are loading', () => {
    const result = sampleRecordsIsLoading.projector(loadingState.callState);
    expect(result).toBe(true);
  });

  it('should tell if sample records are not loading', () => {
    const result = sampleRecordsIsLoading.projector(loadedState.callState);
    expect(result).toBe(false);
  });

  it('should tell if sample records are loaded', () => {
    const result = sampleRecordsIsLoaded.projector(loadedState.callState);
    expect(result).toBe(true);
  });

});
