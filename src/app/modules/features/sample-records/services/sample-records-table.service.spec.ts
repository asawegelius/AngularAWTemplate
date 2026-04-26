import { TestBed } from '@angular/core/testing';
import { SampleRecordsTableService } from './sample-records-table.service';

describe('SampleRecordsTableService', () => {
  let service: SampleRecordsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRecordsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
