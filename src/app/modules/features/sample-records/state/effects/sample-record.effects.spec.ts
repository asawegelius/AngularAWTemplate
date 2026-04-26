import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { SampleRecordEffects } from './sample-record.effects';
import { SampleRecordApiService } from '../../services/sample-record-api.service';
import { MockSampleRecord } from '../mock-models';
import { loadSampleRecords, loadSampleRecordsFailure, loadSampleRecordsSuccess } from '../actions/sample-record.actions';
import type { Mocked } from 'vitest';

describe('SampleRecordEffects', () => {
  let actions$: Observable<any>;
  let effects: SampleRecordEffects;
  let sampleRecordService: Mocked<Pick<SampleRecordApiService, 'getAll'>>;

  beforeEach(() => {
    const sampleRecordServiceSpy = {
      getAll: vi.fn()
    } as unknown as Mocked<Pick<SampleRecordApiService, 'getAll'>>;

    TestBed.configureTestingModule({
      providers: [
        SampleRecordEffects,
        provideMockActions(() => actions$),
        { provide: SampleRecordApiService, useValue: sampleRecordServiceSpy }
      ]
    });

    effects = TestBed.inject(SampleRecordEffects);
    sampleRecordService = TestBed.inject(SampleRecordApiService) as unknown as Mocked<Pick<SampleRecordApiService, 'getAll'>>;
  });

  

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadSampleRecordsSuccess action on successful API call', () => {
    const mockSampleRecords = [new MockSampleRecord()];
    sampleRecordService.getAll.mockReturnValue(of(mockSampleRecords));
  
    actions$ = of(loadSampleRecords());
    effects.loadSampleRecords$.subscribe((resultAction) => {
      expect(resultAction).toEqual(loadSampleRecordsSuccess({ data: mockSampleRecords }));
    });
  });
  
  it('should dispatch loadSampleRecordsFailure action on failed API call', () => {
    const err = new Error('Error occurred!');
    sampleRecordService.getAll.mockReturnValue(throwError(() => err));
  
    actions$ = of(loadSampleRecords());
    effects.loadSampleRecords$.subscribe((resultAction) => {
      expect(resultAction).toEqual(loadSampleRecordsFailure({ errorMsg: err.message }));
    });
  });

  
});


