import { TestBed } from '@angular/core/testing';

import { CustomersTableService } from './customers-table.service';

describe('CustomersTableService', () => {
  let service: CustomersTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
