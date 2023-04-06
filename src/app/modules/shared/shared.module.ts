import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableWithEditCellComponent } from './components/tables/table-with-edit-cell/table-with-edit-cell.component';
import { EditCellComponent } from './components/tables/table-with-edit-cell/edit-cell/edit-cell.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalModule } from './features/modal/modal.module';
import { ResponsiveSideNavigationModule } from './features/layouts/responsive-side-navigation/responsive-side-navigation.module';



@NgModule({
  declarations: [
    TableWithEditCellComponent,
    EditCellComponent
  ],
  imports: [
    ResponsiveSideNavigationModule,
    ModalModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule
  ],
  exports: [
    ResponsiveSideNavigationModule,
    ModalModule,
    TableWithEditCellComponent,
    EditCellComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
