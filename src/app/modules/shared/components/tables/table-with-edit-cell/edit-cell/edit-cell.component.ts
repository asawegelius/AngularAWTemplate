import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  styleUrls: ['./edit-cell.component.scss']
})
export class EditCellComponent implements OnInit {

  form!: UntypedFormGroup;
  local_data: any;
  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditCellComponent>,
    //this is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = { ...data };
  }

  ngOnInit() {
    this.form = this.fb.group({
      data: [this.local_data.data, []]
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
