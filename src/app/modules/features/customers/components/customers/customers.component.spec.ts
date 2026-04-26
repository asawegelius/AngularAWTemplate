import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';

@Component({
  selector: 'app-table-with-edit-cell',
  standalone: false,
  template: ''
})
class TableWithEditCellStubComponent {
  @Input() table: unknown;
  @Output() update = new EventEmitter<unknown>();
}

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent, TableWithEditCellStubComponent ]
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
