import * as CustomerActions from '../actions/customer.actions';
import { ICustomer } from '../../models/customer.interface';
import { MockCustomer } from '../mock-models';

describe('Customer Actions', () => {
  const customerData: ICustomer[] = [new MockCustomer()];

  describe('loadCustomers', () => {
    it('should create an action', () => {
      const action = CustomerActions.loadCustomers();
      expect(action.type).toEqual('[Customer] Load Customers');
    });
  });

  describe('loadCustomersSuccess', () => {
    it('should create an action with the customer data payload', () => {
      const action = CustomerActions.loadCustomersSuccess({ data: customerData });
      expect(action.type).toEqual('[Customer] Load Customers Success');
      expect(action.data).toEqual(customerData);
    });
  });

  describe('loadCustomersFailure', () => {
    it('should create an action with the error message payload', () => {
      const errorMsg = 'An error occurred while loading customers';
      const action = CustomerActions.loadCustomersFailure({ errorMsg });
      expect(action.type).toEqual('[Customer] Load Customers Failure');
      expect(action.errorMsg).toEqual(errorMsg);
    });
  });
});
