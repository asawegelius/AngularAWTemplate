import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CustomerAction from '../actions/customer.actions'
import { of } from 'rxjs';
import { CustomerApiService } from '../../services/customer-api.service';



/**
 * Effects class for handling customer-related actions.
 * @class
 * @implements {OnInit}
 */
@Injectable()
export class CustomerEffects {

  /**
   * Creates an instance of CustomerEffects.
   * @constructor
   * @param {Actions} actions$ - The NgRx actions service.
   * @param {CustomerApiService} customerService$ - The customer API service.
   */
  constructor(
    private actions$: Actions,
    private customerService$: CustomerApiService
  ) { }

  /**
   * Effect that handles the 'loadCustomers' action.
   * Dispatches a 'loadCustomersSuccess' action with the data if the request is successful,
   * or a 'loadCustomersFailure' action with an error message if the request fails.
   * @returns {Observable} - An observable of the 'loadCustomersSuccess' or 'loadCustomersFailure' action.
   */
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerAction.loadCustomers),
      mergeMap(() =>
        this.customerService$.getAll().pipe(
          map(data =>
            CustomerAction.loadCustomersSuccess({ data })
          ),
          catchError(error => of(CustomerAction.loadCustomersFailure({ errorMsg: error.message })))
        )
      )
    )
  );

}
