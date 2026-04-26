import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleRecordsTableService } from '../../services/sample-records-table.service';
import { EditRowInfo } from 'src/app/modules/shared/models/edit-row-info';
import { TableWithEditCellModule } from 'src/app/modules/shared/components/tables/table-with-edit-cell/table-with-edit-cell.module';

import { SampleRecordsComponent } from './sample-records.component';

@Component({
  selector: 'app-table-with-edit-cell',
  standalone: true,
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
        imports: [TableWithEditCellModule]
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
