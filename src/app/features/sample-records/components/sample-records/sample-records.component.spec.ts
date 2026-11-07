import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleRecordsTableService } from './sample-records-table.service';
import { EditRowInfo } from '@shared/components/tables/edit-row-info';
import { TableWithEditCellComponent } from '@shared/components/tables/table-with-edit-cell/table-with-edit-cell.component';

import { SampleRecordsComponent } from './sample-records.component';

@Component({
  selector: 'app-table-with-edit-cell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: ''
})
export class TableWithEditCellStubComponent {
  @Input() table: unknown;
  @Output() update = new EventEmitter<EditRowInfo>();
}

describe('SampleRecordsComponent', () => {
  let component: SampleRecordsComponent;
  let fixture: ComponentFixture<SampleRecordsComponent>;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [SampleRecordsComponent, TableWithEditCellStubComponent],
      providers: [SampleRecordsTableService]
    });

    testBed.overrideComponent(SampleRecordsComponent, {
      remove: {
        imports: [TableWithEditCellComponent]
      },
      add: {
        imports: [TableWithEditCellStubComponent]
      }
    });

    await testBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
