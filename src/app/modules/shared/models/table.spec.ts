import { Table, TableColumn, TableHeader } from './table';
import { TableService } from '../services/tables/table.service';

describe('Table', () => {
  let table: Table<any>;
  let headers: TableHeader[];
  let columns: TableColumn[];
  let data: TableService<any>;

  beforeEach(() => {
    headers = [new TableHeader('Name', false), new TableHeader('Age', true)];
    columns = [new TableColumn('name', false), new TableColumn('age', false)];
    data = new TableService<any>();
    table = new Table(headers, columns, data);
  });

  
  it('should create', () => {
    expect(table).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(table.headers).toEqual(headers);
    expect(table.columns).toEqual(columns);
    expect(table.data).toEqual(data);
    expect(table.editableColumns).toEqual([]);
  });

  it('should return correct columns', () => {
    table.setColumnValues();
    expect(table.displayedColumns).toEqual(['name', 'age']);
  });

  it('should return true for columns with links', () => {
    table.columnLinks.set('name', 'link');
    expect(table.hasLink('name')).toBeTrue();
    expect(table.hasLink('age')).toBeFalse();
  });

  it('should return true for editable columns', () => {
    table.editableColumns = ['name'];
    expect(table.isEditable('name')).toBeTrue();
    expect(table.isEditable('age')).toBeFalse();
  });
});
