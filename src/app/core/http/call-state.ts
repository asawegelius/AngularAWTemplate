/**
 * Represents the different states of a call to an API.
 */
export const enum LoadingState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
}

/**
 * Represents an error state of a call to an API.
 */
export interface ErrorState {
    errorMsg: string;
}

/**
 * Represents a call state of a call to an API, which can be either a loading state or an error state.
 */
export type CallState = LoadingState | ErrorState;

/**
 * Extracts the error message from a call state object if it is in an error state.
 * 
 * @param {CallState} callState - The call state object to extract the error message from.
 * @returns {string | null} The error message, or null if the call state is not in an error state.
 */
export function getError(callState: CallState): string | null { 
    if ((callState as ErrorState).errorMsg !== undefined) { 
        return (callState as ErrorState).errorMsg;
    } 
    return null;
}

/**
 * Represents a state object that includes data and the call state of a call to an API.
 * 
 * @template T - The type of the data.
 */
export interface IState<T> {
    /**
     * The data returned by the API.
     */
    data: T,
    /**
     * The call state of the API call.
     */
    callState: CallState,
}
