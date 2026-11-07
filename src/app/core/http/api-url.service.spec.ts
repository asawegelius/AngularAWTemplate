import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '../config/app-config';
import { ApiUrlService } from './api-url.service';

describe('ApiUrlService', () => {
  let service: ApiUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiUrlService,
        { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com/' } }
      ],
    });
    service = TestBed.inject(ApiUrlService);
  });

  it('should create an API URL from the configured base URL', () => {
    expect(service.create('my/endpoint')).toBe('https://api.example.com/my/endpoint');
  });

  it('should normalize duplicate slashes between the base URL and path', () => {
    expect(service.create('/my/endpoint')).toBe('https://api.example.com/my/endpoint');
  });

  it('should return the configured base URL when the path is empty', () => {
    expect(service.create('')).toBe('https://api.example.com');
  });
});
