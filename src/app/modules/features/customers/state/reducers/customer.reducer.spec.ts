import { TestBed } from '@angular/core/testing';
import { reducer, initialState, customersReducer } from './customer.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadCustomers, loadCustomersFailure, loadCustomersSuccess } from '../actions/customer.actions';
import { LoadingState, getError } from 'src/app/modules/core/utils/call-state';
import { MockCustomer } from '../mock-models';

describe('Customer Reducer', () => {
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

  it('should set the call state to LoadingState.LOADING when loading customers', () => {
    const action = loadCustomers();
    const state = customersReducer(initialState, action);
  
    expect(state.callState).toBe(LoadingState.LOADING);
  });

  it('should set the call state to LoadingState.LOADED and update the customers when loading customers succeed', () => {
    const mockCustomers = [new MockCustomer()];
    const action = loadCustomersSuccess({ data: mockCustomers });
    const state = customersReducer(initialState, action);
  
    expect(state.callState).toBe(LoadingState.LOADED);
    expect(state.data).toEqual(mockCustomers);
  });

  it('should set the call state to the error when loading customers failed', () => {
    const mockError = 'Something went wrong!';
    const action = loadCustomersFailure({ errorMsg: mockError });
    const state = customersReducer(initialState, action);
  
    expect(state.callState.toString()).toBe(mockError);
  });
});
