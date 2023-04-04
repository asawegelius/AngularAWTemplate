import { createAction, props } from '@ngrx/store';

export const openModals = createAction(
  '[Modal] Open Modals',
  props<{ path: any }>()
);

export const closeModals = createAction(
  '[Modal] Close Modals'
);

