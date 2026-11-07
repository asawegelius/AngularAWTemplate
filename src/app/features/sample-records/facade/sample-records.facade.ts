import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSampleRecords } from '../state/sample-record.actions';
import * as fromSampleRecords from '../state/sample-record.selectors';

@Injectable()
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
