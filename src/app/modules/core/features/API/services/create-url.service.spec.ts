import { TestBed } from '@angular/core/testing';
import { CreateUrlService } from './create-url.service';
import { environment } from 'src/environments/environment';

describe('CreateUrlService', () => {
  let service: CreateUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUrlService],
    });
    service = TestBed.inject(CreateUrlService);
  });

  describe('createUrl', () => {
    it('should create a URL with the API base URL by default', () => {
      const endpoint = 'my/endpoint';
      const expectedUrl = `${environment.apiUrl}/${endpoint}`;
      const actualUrl = service.createUrl(endpoint);

      expect(actualUrl).toBe(expectedUrl);
    });

    it('should create a URL with the mock API base URL when isMockAPI is true', () => {
      const endpoint = 'my/endpoint';
      const expectedUrl = `${environment.mockApiUrl}/${endpoint}`;
      const actualUrl = service.createUrl(endpoint, true);

      expect(actualUrl).toBe(expectedUrl);
    });
  });

  describe('createUrlWithQueryParameters', () => {
    it('should create a URL with query parameters', () => {
      const endpoint = 'my/endpoint';
      const expectedUrl = `${environment.apiUrl}/${endpoint}?param1=value1&param2=value2`;
      const actualUrl = service.createUrlWithQueryParameters(endpoint, (qs) => {
        qs.pushOrReplace('param1', 'value1');
        qs.pushOrReplace('param2', 'value2');
      });

      expect(actualUrl).toBe(expectedUrl);
    });

    it('should create a URL with the mock API base URL when isMockAPI is true', () => {
      const endpoint = 'my/endpoint';
      const expectedUrl = `${environment.mockApiUrl}/${endpoint}?param1=value1&param2=value2`;
      const actualUrl = service.createUrlWithQueryParameters(endpoint, (qs) => {
        qs.pushOrReplace('param1', 'value1');
        qs.pushOrReplace('param2', 'value2');
      }, true);

      expect(actualUrl).toBe(expectedUrl);
    });
  });

  describe('createUrlWithPathVariables', () => {
    it('should create a URL with path variables', () => {
      const endpoint = 'my/endpoint';
      const pathVariables = [123, 'abc', true];
      const expectedUrl = `${environment.apiUrl}/${endpoint}/123/abc/true`;
      const actualUrl = service.createUrlWithPathVariables(endpoint, pathVariables);

      expect(actualUrl).toBe(expectedUrl);
    });

    it('should create a URL with the mock API base URL when isMockAPI is true', () => {
      const endpoint = 'my/endpoint';
      const pathVariables = [123, 'abc', true];
      const expectedUrl = `${environment.mockApiUrl}/${endpoint}/123/abc/true`;
      const actualUrl = service.createUrlWithPathVariables(endpoint, pathVariables, true);

      expect(actualUrl).toBe(expectedUrl);
    });
  });
});
