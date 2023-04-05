import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/modules/features/customers/models/customer.interface';
import { TableService } from 'src/app/modules/shared/services/tables/table.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersTableService extends TableService<ICustomer> {

  constructor() {
    super();
  }
}
