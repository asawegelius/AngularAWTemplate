import { MatTableDataSource } from '@angular/material/table';
import { TestType } from '../../core/services/resource.service.spec';
import { Table } from './table';
import { TableService } from '../services/tables/table.service';

describe('Table', () => {
  const mockData = new MatTableDataSource<TestType>([])
  it('should create an instance', () => {
    expect(new Table([], [], new TableService<TestType>())).toBeTruthy();
  });
});
