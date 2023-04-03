import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCustomers } from '../../actions/customer.actions';
import * as fromCustomers from '../../selectors/customer.selectors';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss']
})
export class CustomersPageComponent implements OnInit {
  customers$ = this.store.select(fromCustomers.selectCustomerList);
  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.store.dispatch(loadCustomers());
  }

}
