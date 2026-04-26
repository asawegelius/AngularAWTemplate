import * as SampleRecordActions from './sample-record.actions';
import { SampleRecord } from '../../models/sample-record.interface';
import { MockSampleRecord } from '../mock-models';

describe('Sample Record Actions', () => {
  const sampleRecords: SampleRecord[] = [new MockSampleRecord()];

  describe('loadSampleRecords', () => {
    it('should create an action', () => {
      const action = SampleRecordActions.loadSampleRecords();
      expect(action.type).toEqual('[Sample Records] Load Sample Records');
    });
  });

  describe('loadSampleRecordsSuccess', () => {
    it('should create an action with the sample record data payload', () => {
      const action = SampleRecordActions.loadSampleRecordsSuccess({ data: sampleRecords });
      expect(action.type).toEqual('[Sample Records] Load Sample Records Success');
      expect(action.data).toEqual(sampleRecords);
    });
  });

  describe('loadSampleRecordsFailure', () => {
    it('should create an action with the error message payload', () => {
      const errorMsg = 'An error occurred while loading sample records';
      const action = SampleRecordActions.loadSampleRecordsFailure({ errorMsg });
      expect(action.type).toEqual('[Sample Records] Load Sample Records Failure');
      expect(action.errorMsg).toEqual(errorMsg);
    });
  });
});
