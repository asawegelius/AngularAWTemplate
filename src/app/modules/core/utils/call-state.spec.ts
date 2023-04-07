import { CallState, ErrorState, IState, LoadingState, getError } from './call-state';

describe('LoadingState', () => {
  it('should have a string value of "INIT" for the INIT property', () => {
    expect(LoadingState.INIT).toBe('INIT');
  });

  it('should have a string value of "LOADING" for the LOADING property', () => {
    expect(LoadingState.LOADING).toBe('LOADING');
  });

  it('should have a string value of "LOADED" for the LOADED property', () => {
    expect(LoadingState.LOADED).toBe('LOADED');
  });
});

describe('ErrorState', () => {
  it('should have an errorMsg property of type string', () => {
    const errorState: ErrorState = { errorMsg: 'Error message' };
    expect(typeof errorState.errorMsg).toBe('string');
  });
});

describe('IState', () => {
  it('should have a data property of type T', () => {
    const iState: IState<number> = { data: 123, callState: LoadingState.INIT };
    expect(typeof iState.data).toBe('number');
    expect(iState.data).toBe(123);
  });

  it('should have a callState property of type CallState', () => {
    const iState: IState<number> = { data: 123, callState: LoadingState.INIT };
    expect(typeof iState.callState).toBe('string');
    expect(iState.callState).toBe(LoadingState.INIT);
  });
});

describe('getError', () => {
  it('should return null if callState is a LoadingState', () => {
    const callState: CallState = LoadingState.INIT;
    const error = getError(callState);
    expect(error).toBeNull();
  });

  it('should return the error message if callState is an ErrorState', () => {
    const callState: CallState = { errorMsg: 'Error message' };
    const error = getError(callState);
    expect(error).toBe(callState.errorMsg);
  });
});
