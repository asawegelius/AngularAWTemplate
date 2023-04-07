import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account!: any;


  ngOnInit(): void {
    this.account = this.getAccountDetails();
  }

  getAccountDetails() {
    return {
      accountNumber: '123',
      customerId: 123,
      balance: 125,
      currency: 'DKR',
      accountType: 'Checking'
    }
  }
}
