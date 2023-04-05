import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from 'src/app/reducers';
import { closeModals } from '../../state/actions/modal.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  @Input()
  size!: string;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  styles = 'modal';

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {

    if (this.size === 'small') {
      this.styles = 'modal modal-small';
    } else if (this.size === 'medium') {
      this.styles = 'modal modal-medium';
    }

  }

  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeModal() {
    this.subscriptions.add(this.store.dispatch(closeModals()));
  }

  close() {
    this.closeModal();
  }

}
