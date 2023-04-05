

import { LoadingState } from 'src/app/modules/core/utils/call-state';
import { MockCustomer } from '../mock-models';
import { customersIsLoaded, customersIsLoading, getCustomersError, selectCustomerList} from './customer.selectors';
import { State } from '../reducers/customer.reducer';

describe('Customer selectors', () => {
  const mockCustomer = new MockCustomer();
  const loadingState = {
      data: [],
      callState: LoadingState.LOADING
    } as State;
  const loadedState = {
      data: [mockCustomer],
      callState: LoadingState.LOADED
    } as State;
  const failedState = {
    data: [],
    callState: {errorMsg: "some error"}
  } as State;

  it('should select the customer list', () => {
    const result = selectCustomerList.projector(loadedState)
    expect(result).toBe(loadedState.data);
  });

  it('should select the customers error', () => {
    const result = getCustomersError.projector(loadedState);
    expect(result).toBeNull();
  });

  it('should select the customers error', () => {
    const result = getCustomersError.projector(failedState);
    expect(result).toBe("some error");
  });

  it('should tell if customers is loading', () => {
    const result = customersIsLoading.projector(loadingState);
    expect(result).toBe(true);
  });

  it('should tell if customers is loading', () => {
    const result = customersIsLoading.projector(loadedState);
    expect(result).toBe(false);
  });

  it('should tell if customers is loaded', () => {
    const result = customersIsLoaded.projector(loadedState);
    expect(result).toBe(true);
  });

});
