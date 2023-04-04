import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ModalEffects } from './modal.effects';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { closeModals, openModals } from '../actions/modal.actions';

describe('ModalEffects', () => {
  let actions$: Observable<any>;
  let effects: ModalEffects;
  let router: Router;
  let location: Location;
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const locationMock = jasmine.createSpyObj('Location', ['back']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        ModalEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock }
      ]
    });
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    effects = TestBed.inject(ModalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should navigate to the specified path when openModals action is dispatched', (done) => {
    const props = { path: 'modal-path' };
    actions$ = of(openModals(props));

    effects.openModals$.subscribe((action) => {
      expect(action.path).toEqual('modal-path');
      expect(routerMock.navigate).toHaveBeenCalledWith([{ outlets: { modal: props.path } }]);
      done();
    }).unsubscribe();
  });

  it('should call Location.back() when closeModals action is dispatched', (done) => {
    actions$ = of(closeModals);
    effects.closeModals$.subscribe().unsubscribe();
    expect(locationMock.back).toHaveBeenCalled();
    done();
  });

});
