import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampleRecord } from '../models/sample-record.interface';
import { ResourceService } from '@core/http/resource.service';
import { ApiUrlService } from '@core/http/api-url.service';
import { API_ENDPOINTS } from './sample-record.endpoints';

/**
 * A service to handle HTTP requests to the sample records API endpoint.
 */
@Injectable()
export class SampleRecordApiService extends ResourceService<SampleRecord> {

  /**
   * Creates an instance of the `SampleRecordApiService` class.
   * @param httpClient The `HttpClient` module to handle HTTP requests.
   * @param apiUrl The service used to create absolute API URLs.
   */
  constructor(
    protected httpClient: HttpClient,
    private apiUrl: ApiUrlService) {
    super(httpClient);
  }

  /**
   * Gets the URL for the sample records API endpoint.
   * @returns The URL for the sample records API endpoint.
   */
  getResourceUrl(): string {
    return this.apiUrl.create(API_ENDPOINTS.sampleRecords);
  }

}

