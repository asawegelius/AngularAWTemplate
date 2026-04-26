import { initialState, reducer, sampleRecordAdapter, sampleRecordsReducer } from './sample-record.reducer';
import { loadSampleRecords, loadSampleRecordsFailure, loadSampleRecordsSuccess } from '../actions/sample-record.actions';
import { LoadingState } from 'src/app/modules/core/utils/call-state';
import { MockSampleRecord } from '../mock-models';

describe('Sample Record Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  it('should set the call state to LoadingState.LOADING when loading sample records', () => {
    const action = loadSampleRecords();
    const state = sampleRecordsReducer(initialState, action);
  
    expect(state.callState).toBe(LoadingState.LOADING);
  });

  it('should set the call state to LoadingState.LOADED and update the sample records when loading succeeds', () => {
    const mockSampleRecords = [new MockSampleRecord()];
    const action = loadSampleRecordsSuccess({ data: mockSampleRecords });
    const state = sampleRecordsReducer(initialState, action);
  
    expect(state.callState).toBe(LoadingState.LOADED);
    expect(sampleRecordAdapter.getSelectors().selectAll(state)).toEqual(mockSampleRecords);
  });

  it('should set the call state to the error when loading sample records fails', () => {
    const mockError = 'Something went wrong!';
    const action = loadSampleRecordsFailure({ errorMsg: mockError });
    const state = sampleRecordsReducer(initialState, action);
  
    expect(state.callState).toEqual({ errorMsg: mockError });
  });
});
