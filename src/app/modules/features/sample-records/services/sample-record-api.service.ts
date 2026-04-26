import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampleRecord } from '../models/sample-record.interface';
import { ResourceService } from 'src/app/modules/core/features/API/services/resource.service';
import { CreateUrlService } from 'src/app/modules/core/features/API/services/create-url.service';
import { Endpoints } from 'src/app/modules/core/features/API/utils/endpoints';

/**
 * A service to handle HTTP requests to the sample records API endpoint.
 */
@Injectable({
  providedIn: 'root'
})
export class SampleRecordApiService extends ResourceService<SampleRecord> {

  /** The base URL for the sample records API endpoint. */
  url!: string;

  /**
   * Creates an instance of the `SampleRecordApiService` class.
   * @param httpClient The `HttpClient` module to handle HTTP requests.
   * @param endpoints The `Endpoints` module to provide the API endpoint URLs.
   * @param urls The `CreateUrlService` module to create the complete API endpoint URL.
   */
  constructor(
    protected httpClient: HttpClient,
    private endpoints: Endpoints,
    private urls: CreateUrlService) {
    super(httpClient);
    this.setBaseUrl();
  }

  /**
   * Gets the URL for the sample records API endpoint.
   * @returns The URL for the sample records API endpoint.
   */
  getResourceUrl(): string {
    return this.url;
  }

  /**
   * Sets the base URL for the sample records API endpoint using the `CreateUrlService`.
   */
  setBaseUrl() {
    this.url = this.urls?.createUrl(this.endpoints?.SAMPLE_RECORDS);
  }

}

