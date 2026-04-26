import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleRecordsTableService } from '../../services/sample-records-table.service';
import { EditRowInfo } from 'src/app/modules/shared/models/edit-row-info';

import { SampleRecordsComponent } from './sample-records.component';

@Component({
  selector: 'app-table-with-edit-cell',
  standalone: false,
  template: ''
})
export class TableWithEditCellStubComponent {
  @Input() table: unknown;
  @Output() update = new EventEmitter<EditRowInfo>();
}

@NgModule({
  declarations: [SampleRecordsComponent, TableWithEditCellStubComponent]
})
class SampleRecordsComponentTestModule {}

describe('SampleRecordsComponent', () => {
  let component: SampleRecordsComponent;
  let fixture: ComponentFixture<SampleRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleRecordsComponentTestModule],
      providers: [SampleRecordsTableService]
    })
    .compileComponents();
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
