import { createAction, props } from '@ngrx/store';
import { SampleRecord } from '../../models/sample-record.interface';

export const loadSampleRecords = createAction(
  '[Sample Records] Load Sample Records'
);

export const loadSampleRecordsSuccess = createAction(
  '[Sample Records] Load Sample Records Success',
  props<{ data: SampleRecord[] }>()
);

export const loadSampleRecordsFailure = createAction(
  '[Sample Records] Load Sample Records Failure',
  props<{ errorMsg: string }>()
);
