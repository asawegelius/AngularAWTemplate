import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from '@ngrx/router-store';
/**
 * Represents the current state of the Angular router.
 */
export interface RouterState {
    /** The URL of the current route. */
    url: string;
    /** The parameters of the current route. */
    params: Params;
    /** The query parameters of the current route. */
    queryParams: Params;
}

/**
 * Implements the `RouterStateSerializer` interface to serialize the Angular router's
 * state to a plain JavaScript object.
 */
export class RouterSerializer implements RouterStateSerializer<RouterState> {

    /**
     * Serializes the Angular router's state to a plain JavaScript object.
     *
     * @param routerState The snapshot of the router state to serialize.
     * @returns The serialized router state as a plain JavaScript object.
     */
    serialize(routerState: RouterStateSnapshot): RouterState {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams };
    }
}
