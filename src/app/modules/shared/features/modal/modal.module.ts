import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { EffectsModule } from '@ngrx/effects';
import { ModalEffects } from './state/effects/modal.effects';



@NgModule({
  declarations: [
    ModalComponent,],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ModalEffects]),
  ]
})
export class ModalModule { }
