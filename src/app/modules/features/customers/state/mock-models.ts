import { ICustomer, ICustomerType } from "../models/customer.interface";

export class MockCustomer implements ICustomer {
    customerId: number = 1;
    firstName: string = "Alice";
    lastName: string = "Jensen";
    phoneNumber: string = "12345678";
    emailAddress: string = "alice.jensen@google.com";
    startDate: Date = new Date();
    type: ICustomerType = new MockCustomerType();

}

export class MockCustomerType implements ICustomerType {
    type: string = "private";
    description: string = "private customer";

}