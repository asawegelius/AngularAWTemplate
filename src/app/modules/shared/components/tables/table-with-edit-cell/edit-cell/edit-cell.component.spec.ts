import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditCellComponent } from './edit-cell.component';
import type { Mocked } from 'vitest';

@NgModule({
  declarations: [EditCellComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
class EditCellTestModule {}

describe('EditCellComponent', () => {
  let component: EditCellComponent;
  let fixture: ComponentFixture<EditCellComponent>;
  let dialogRef: Mocked<Pick<MatDialogRef<EditCellComponent>, 'close'>>;

  beforeEach(async () => {
    dialogRef = {
      close: vi.fn()
    } as unknown as Mocked<Pick<MatDialogRef<EditCellComponent>, 'close'>>;

    await TestBed.configureTestingModule({
      imports: [
        EditCellTestModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { data: 'test' } },
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
