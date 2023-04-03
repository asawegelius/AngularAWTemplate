import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/modules/features/customers/models/customer.interface';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersTableService extends TableService<ICustomer> {

  constructor() {
    super();
  }
}
