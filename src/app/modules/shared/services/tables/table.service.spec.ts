import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { TestType } from 'src/app/modules/core/services/resource.service.spec';


describe('TableService', () => {
  let service: TableService<TestType>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


