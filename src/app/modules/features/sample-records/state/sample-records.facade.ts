import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSampleRecords } from './actions/sample-record.actions';
import * as fromSampleRecords from './selectors/sample-record.selectors';

@Injectable({
  providedIn: 'root'
})
export class SampleRecordsFacade {
  readonly sampleRecords$ = this.store.select(fromSampleRecords.selectSampleRecordList);
  readonly isLoading$ = this.store.select(fromSampleRecords.sampleRecordsIsLoading);
  readonly isLoaded$ = this.store.select(fromSampleRecords.sampleRecordsIsLoaded);
  readonly error$ = this.store.select(fromSampleRecords.getSampleRecordsError);

  constructor(private store: Store) {}

  loadSampleRecords(): void {
    this.store.dispatch(loadSampleRecords());
  }
}
