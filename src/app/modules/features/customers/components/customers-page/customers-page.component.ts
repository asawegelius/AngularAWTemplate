import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCustomers } from '../../state/actions/customer.actions';
import * as fromCustomers from '../../state/selectors/customer.selectors';

/**
 * Component for displaying a list of customers.
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss']
})
export class CustomersPageComponent implements OnInit {

  /** An Observable that emits the list of customers. */
  customers$ = this.store.select(fromCustomers.selectCustomerList);

  /**
   * Creates an instance of CustomersPageComponent.
   * @constructor
   * @param {Store} store - The NgRx store.
   */
  constructor(
    private store: Store,
  ) { }

  /**
   * Lifecycle method called after component initialization.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getCustomers();
  }

  /**
   * Dispatches an action to load customers from the store.
   * @returns {void}
   */
  getCustomers(): void {
    this.store.dispatch(loadCustomers());
  }

}

