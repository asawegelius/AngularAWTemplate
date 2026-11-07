import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';


describe('TableService', () => {
  let service: TableService<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableService]
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should set data correctly', () => {
    const data = [1, 2, 3];
    service.setData(data);
    service.getData().subscribe(result => {
      expect(result).toEqual(data);
    }).unsubscribe();
  });

  it('should return observable with correct data', () => {
    const data = [4, 5, 6];
    service.setData(data);
    const observable = service.getData();
    expect(observable).toBeTruthy();
    observable.subscribe(result => {
      expect(result).toEqual(data);
    }).unsubscribe();
  });
});


