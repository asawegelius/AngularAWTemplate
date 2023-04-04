import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithEditCellComponent } from './table-with-edit-cell.component';
import { TestType } from 'src/app/modules/core/services/resource.service.spec';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Table } from '../../../models/table';
import { TableService } from '../../../services/tables/table.service';

describe('TableWithEditCellComponent', () => {
  let component: TableWithEditCellComponent<TestType>;
  const table = new Table<TestType>([], [], new TableService<TestType>);
  let fixture: ComponentFixture<TableWithEditCellComponent<TestType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWithEditCellComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} }  
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithEditCellComponent<TestType>);
    component = fixture.componentInstance;
    component.table = table;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
