import { TestBed } from '@angular/core/testing';
import { reducer, initialState, sampleRecordsReducer } from './sample-record.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadSampleRecords, loadSampleRecordsFailure, loadSampleRecordsSuccess } from '../actions/sample-record.actions';
import { LoadingState } from 'src/app/modules/core/utils/call-state';
import { MockSampleRecord } from '../mock-models';

describe('Sample Record Reducer', () => {
  let store: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ]
    });

    store = TestBed.inject(MockStore);
  });


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
    expect(state.data).toEqual(mockSampleRecords);
  });

  it('should set the call state to the error when loading sample records fails', () => {
    const mockError = 'Something went wrong!';
    const action = loadSampleRecordsFailure({ errorMsg: mockError });
    const state = sampleRecordsReducer(initialState, action);
  
    expect(state.callState).toEqual({ errorMsg: mockError });
  });
});
