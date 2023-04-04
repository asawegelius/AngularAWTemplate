import { TestBed } from '@angular/core/testing';

import { CustomerApiService } from './customer-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Endpoints } from 'src/app/modules/core/constants/endpoints';

describe('CustomerApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [Endpoints]
    });
    service = TestBed.inject(CustomerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
