import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ApiUrlService } from './api-url.service';

describe('ApiUrlService', () => {
  let service: ApiUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlService],
    });
    service = TestBed.inject(ApiUrlService);
  });

  it('should create an API URL from the configured base URL', () => {
    expect(service.create('my/endpoint')).toBe(`${environment.apiUrl}/my/endpoint`);
  });

  it('should normalize duplicate slashes between the base URL and path', () => {
    expect(service.create('/my/endpoint')).toBe(`${environment.apiUrl}/my/endpoint`);
  });
});
