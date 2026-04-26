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
    expect(table.hasLink('name')).toBe(true);
    expect(table.hasLink('age')).toBe(false);
  });

  it('should return true for editable columns', () => {
    table.editableColumns = ['name'];
    expect(table.isEditable('name')).toBe(true);
    expect(table.isEditable('age')).toBe(false);
  });
});
