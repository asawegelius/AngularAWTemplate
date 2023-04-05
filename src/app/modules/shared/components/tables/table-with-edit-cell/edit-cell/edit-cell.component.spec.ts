import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { EditCellComponent } from './edit-cell.component';

describe('EditCellComponent', () => {
  let component: EditCellComponent;
  let fixture: ComponentFixture<EditCellComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditCellComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [ EditCellComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        UntypedFormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close the dialog on close()', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog and return form value on save()', () => {
    component.form.setValue({ data: 'new test' });
    component.save();
    expect(dialogRef.close).toHaveBeenCalledWith({ data: 'new test' });
  });
});
