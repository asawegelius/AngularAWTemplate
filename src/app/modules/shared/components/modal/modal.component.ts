import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  size!: string;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  styles = 'modal';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    if (this.size === 'small') {
      this.styles = 'modal modal-small';
    } else if (this.size === 'medium') {
      this.styles = 'modal modal-medium';
    }



  }

  closeModal($event: any) {
    this.router.navigate([{ outlets: { modal: null } }]);
    this.modalClose.next($event);
  }

  close() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

}
