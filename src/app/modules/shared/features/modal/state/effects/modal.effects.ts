import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { closeModals, openModals } from '../actions/modal.actions';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Injectable()
export class ModalEffects {

  openModals$ =
    createEffect(() =>
      this.actions$.pipe(
        ofType(openModals),
        tap((props) => {
          this.router$.navigate([{ outlets: { modal: props.path } }]);
        })), { dispatch: false }
    );

  closeModals$ =
    createEffect(() =>
      this.actions$.pipe(
        ofType(closeModals),
        tap(() => {
          this.location$.back();
        })), { dispatch: false }
    );

  constructor(
    private router$: Router,
    private location$: Location,
    private actions$: Actions) { }
}
