export interface ICustomer {
    customerId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    startDate: Date;
    type: ICustomerType;
}


export interface ICustomerType {
    type: string;
    description: string;
}
