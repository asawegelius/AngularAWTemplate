import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer.interface';
import { ResourceService } from 'src/app/modules/core/features/API/services/resource.service';
import { CreateUrlService } from 'src/app/modules/core/features/API/services/create-url.service';
import { Endpoints } from 'src/app/modules/core/features/API/utils/endpoints';

/**
 * A service to handle HTTP requests to the customer API endpoint.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerApiService extends ResourceService<ICustomer> {

  /** The base URL for the customer API endpoint. */
  url!: string;

  /**
   * Creates an instance of the `CustomerApiService` class.
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
   * Gets the URL for the customer API endpoint.
   * @returns The URL for the customer API endpoint.
   */
  getResourceUrl(): string {
    return this.url;
  }

  /**
   * Sets the base URL for the customer API endpoint using the `CreateUrlService`.
   */
  setBaseUrl() {
    // set base url
    this.url = this.urls?.createUrl(this.endpoints?.CUSTOMERS);
  }

}

