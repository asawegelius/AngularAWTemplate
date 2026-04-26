

import { LoadingState } from 'src/app/modules/core/utils/call-state';
import { MockSampleRecord } from '../mock-models';
import { getSampleRecordsError, sampleRecordsIsLoaded, sampleRecordsIsLoading, selectSampleRecordList } from './sample-record.selectors';
import { State } from '../reducers/sample-record.reducer';

describe('Sample record selectors', () => {
  const mockSampleRecord = new MockSampleRecord();
  const loadingState = {
      data: [],
      callState: LoadingState.LOADING
    } as State;
  const loadedState = {
      data: [mockSampleRecord],
      callState: LoadingState.LOADED
    } as State;
  const failedState = {
    data: [],
    callState: {errorMsg: "some error"}
  } as State;

  it('should select the sample record list', () => {
    const result = selectSampleRecordList.projector(loadedState);
    expect(result).toBe(loadedState.data);
  });

  it('should return null when there is no sample-record error', () => {
    const result = getSampleRecordsError.projector(loadedState);
    expect(result).toBeNull();
  });

  it('should select the sample-record error', () => {
    const result = getSampleRecordsError.projector(failedState);
    expect(result).toBe('some error');
  });

  it('should tell if sample records are loading', () => {
    const result = sampleRecordsIsLoading.projector(loadingState);
    expect(result).toBe(true);
  });

  it('should tell if sample records are not loading', () => {
    const result = sampleRecordsIsLoading.projector(loadedState);
    expect(result).toBe(false);
  });

  it('should tell if sample records are loaded', () => {
    const result = sampleRecordsIsLoaded.projector(loadedState);
    expect(result).toBe(true);
  });

});
