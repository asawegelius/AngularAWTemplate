import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersTableService } from '../../services/customers-table.service';
import { EditRowInfo } from 'src/app/modules/shared/models/edit-row-info';

import { CustomersComponent } from './customers.component';

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
  declarations: [CustomersComponent, TableWithEditCellStubComponent]
})
class CustomersComponentTestModule {}

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersComponentTestModule],
      providers: [CustomersTableService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
