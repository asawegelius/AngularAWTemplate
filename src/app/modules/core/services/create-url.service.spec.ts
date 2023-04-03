import { TestBed } from '@angular/core/testing';

import { CreateUrlService } from './create-url.service';

describe('CreateUrlService', () => {
  let service: CreateUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
