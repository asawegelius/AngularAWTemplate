import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CustomerEffects } from './customer.effects';
import { CustomerApiService } from '../../services/customer-api.service';
import { MockCustomer } from '../mock-models';
import { loadCustomers, loadCustomersFailure, loadCustomersSuccess } from '../actions/customer.actions';
import type { Mocked } from 'vitest';

describe('CustomerEffects', () => {
  let actions$: Observable<any>;
  let effects: CustomerEffects;
  let customerService: Mocked<Pick<CustomerApiService, 'getAll'>>;

  beforeEach(() => {
    const customerServiceSpy = {
      getAll: vi.fn()
    } as unknown as Mocked<Pick<CustomerApiService, 'getAll'>>;

    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        provideMockActions(() => actions$),
        { provide: CustomerApiService, useValue: customerServiceSpy }
      ]
    });

    effects = TestBed.inject(CustomerEffects);
    customerService = TestBed.inject(CustomerApiService) as unknown as Mocked<Pick<CustomerApiService, 'getAll'>>;
  });

  

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadCustomersSuccess action on successful API call', () => {
    const mockCustomers = [new MockCustomer()];
    customerService.getAll.mockReturnValue(of(mockCustomers));
  
    actions$ = of(loadCustomers());
    effects.loadCustomers$.subscribe((resultAction) => {
      expect(resultAction).toEqual(loadCustomersSuccess({ data: mockCustomers }));
    });
  });
  
  it('should dispatch loadCustomersFailure action on failed API call', () => {
    const err = new Error('Error occurred!');
    customerService.getAll.mockReturnValue(throwError(() => err));
  
    actions$ = of(loadCustomers());
    effects.loadCustomers$.subscribe((resultAction) => {
      expect(resultAction).toEqual(loadCustomersFailure({ errorMsg: err.message }));
    });
  });

  
});


