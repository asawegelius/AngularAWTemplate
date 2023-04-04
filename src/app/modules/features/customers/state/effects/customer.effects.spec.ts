import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CustomerEffects } from './customer.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Endpoints } from 'src/app/modules/core/constants/endpoints';

describe('CustomerEffects', () => {
  let actions$: Observable<any>;
  let effects: CustomerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Endpoints,
        CustomerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CustomerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
