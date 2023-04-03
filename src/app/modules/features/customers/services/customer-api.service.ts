import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/modules/core/constants/endpoints';
import { CreateUrlService } from 'src/app/modules/core/services/create-url.service';
import { ResourceService } from 'src/app/modules/core/services/resource.service';
import { ICustomer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService extends ResourceService<ICustomer>{


  constructor(
    protected httpClient: HttpClient,
    private endpoints: Endpoints,
    private urls: CreateUrlService) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return this.urls?.createUrl(this.endpoints?.CUSTOMERS);
  }

}
