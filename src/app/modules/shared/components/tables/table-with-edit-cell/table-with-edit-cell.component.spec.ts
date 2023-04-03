import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithEditCellComponent } from './table-with-edit-cell.component';

describe('TableWithEditCellComponent', () => {
  let component: TableWithEditCellComponent;
  let fixture: ComponentFixture<TableWithEditCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWithEditCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithEditCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
