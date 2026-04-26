import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SampleRecordApiService } from './sample-record-api.service';

describe('SampleRecordApiService', () => {
  let service: SampleRecordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SampleRecordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
