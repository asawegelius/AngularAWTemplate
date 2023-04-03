import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CustomerAction from '../actions/customer.actions'
import { of } from 'rxjs';
import { CustomerApiService } from '../services/customer-api.service';



@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private customerService$: CustomerApiService
  ) { }

  loadCustomers$ =
    createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerAction.loadCustomers),
        mergeMap(() =>
          this.customerService$.getAll().pipe(
            map(customers =>
              CustomerAction.loadCustomersSuccess({ customers })
            ),
            catchError(error => of(CustomerAction.loadCustomersFailure({ error: error.message })))
          )
        )
      ));

}
