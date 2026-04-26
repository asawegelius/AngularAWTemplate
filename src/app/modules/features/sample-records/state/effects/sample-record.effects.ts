import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SampleRecordActions from '../actions/sample-record.actions';
import { of } from 'rxjs';
import { SampleRecordApiService } from '../../services/sample-record-api.service';



/**
 * Effects class for handling sample-record actions.
 * @class
 * @implements {OnInit}
 */
@Injectable()
export class SampleRecordEffects {

  /**
   * Creates an instance of SampleRecordEffects.
   * @constructor
   * @param {Actions} actions$ - The NgRx actions service.
   * @param {SampleRecordApiService} sampleRecordApiService - The sample-record API service.
   */
  constructor(
    private actions$: Actions,
    private sampleRecordApiService: SampleRecordApiService
  ) { }

  /**
   * Effect that handles the load-sample-records action.
   * Dispatches a success action with the data if the request is successful,
   * or a failure action with an error message if the request fails.
   * @returns {Observable} An observable of the success or failure action.
   */
  loadSampleRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleRecordActions.loadSampleRecords),
      mergeMap(() =>
        this.sampleRecordApiService.getAll().pipe(
          map(data =>
            SampleRecordActions.loadSampleRecordsSuccess({ data })
          ),
          catchError(error => of(SampleRecordActions.loadSampleRecordsFailure({ errorMsg: error.message })))
        )
      )
    )
  );

}
