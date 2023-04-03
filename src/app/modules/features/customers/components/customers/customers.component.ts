import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EditRowInfo } from 'src/app/modules/shared/models/edit-row-info';
import { Table, TableColumn, TableHeader } from 'src/app/modules/shared/models/table';
import { CustomersTableService } from 'src/app/modules/shared/services/tables/customers-table.service';
import { ICustomer } from '../../models/customer.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @Input()
  data!: Observable<ICustomer[]>;

  constructor(private dataService: CustomersTableService) { }

  getTable(): Table<ICustomer> {
    const headers: TableHeader[] = [
      new TableHeader('Customer id', true),
      new TableHeader('First name', true),
      new TableHeader('Last name', true),
      new TableHeader('Phone number', true),
      new TableHeader('Email address', true),
      new TableHeader('Start date', true),
      new TableHeader('Customer type', true)
    ];

    const columns: TableColumn[] = [
      new TableColumn('customerId', false),
      new TableColumn('firstName', false),
      new TableColumn('lastName', false),
      new TableColumn('phoneNumber', false),
      new TableColumn('emailAddress', false),
      new TableColumn('startDate', false),
      new TableColumn('typeDescription', false)
    ];

    return new Table(headers, columns, this.dataService, ['lastName', 'phoneNumber']);
  }

  update(editRowInfo: EditRowInfo) {
    console.warn(editRowInfo);
  }

  ngOnInit(): void {
    this.data?.subscribe(data => {
      let initdata: ICustomer[] = [];
      data.forEach(element => {
        const newCustomer = { ...element, typeDescription: element.type.description }
        initdata.push(newCustomer)
      });
      this.dataService.setData(initdata);
    });
  }
}
