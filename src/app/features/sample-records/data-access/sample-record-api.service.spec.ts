import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { APP_CONFIG } from '@core/config/app-config';
import { SampleRecordApiService } from './sample-record-api.service';

describe('SampleRecordApiService', () => {
  let service: SampleRecordApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        SampleRecordApiService,
        { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com/v1/' } }
      ]
    });
    service = TestBed.inject(SampleRecordApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should load records from the feature endpoint using the configured API URL', () => {
    const records = [{ id: 1, title: 'Website refresh' }];
    const received = vi.fn();

    service.getAll().subscribe(received);

    const request = http.expectOne('https://api.example.com/v1/sample-records');
    expect(request.request.method).toBe('GET');
    request.flush(records);

    expect(received).toHaveBeenCalledWith(records);
  });
});
