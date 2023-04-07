import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { openModals } from 'src/app/modules/shared/features/modal/state/actions/modal.actions';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {

  constructor(
    private store: Store,) { }

  ngOnInit(): void {
  }
  openAccountDetails() {
    this.store.dispatch(openModals({path: 'account-details'}));
  }

}
