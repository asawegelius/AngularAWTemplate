import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { closeModals } from '../../state/actions/modal.actions';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
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

  closeModal() {
    this.store.dispatch(closeModals());
  }

  close() {
    this.closeModal();
  }

}
