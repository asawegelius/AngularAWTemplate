import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { EditRowInfo } from '../../../models/edit-row-info';
import { Table, TableColumn, TableHeader } from '../../../models/table';
import { EditCellComponent } from './edit-cell/edit-cell.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-table-with-edit-cell',
  templateUrl: './table-with-edit-cell.component.html',
  styleUrls: ['./table-with-edit-cell.component.scss']
})
export class TableWithEditCellComponent<T> implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Output() clicked: EventEmitter<T> = new EventEmitter<T>();
  @Output() update: EventEmitter<EditRowInfo> = new EventEmitter<EditRowInfo>();
  @Input() table!: Table<T>;
  tableColumns: TableColumn[] = [];
  displayedColumns: string[] = [];
  headers: TableHeader[] = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  tabledata: T[] = [];
  dataTable!: Table<T>;
  isDataLoaded = false;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  constructor(
    public dialog: MatDialog
  ) { }



  public iconClicked(data: T) {

    this.clicked.emit(data);

  }

  public openDialog(row: any, col: string, event: MouseEvent, i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: event.screenY - 225 + 'px',
      left: event.screenX + 35 + 'px'
    };
    dialogConfig.height = '150px';
    dialogConfig.data = {
      data: row[col],
      top: event.screenY,
      left: event.screenX
    };
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(EditCellComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      output => {
        if (output) {
          const data: any = output.data;
          this.update.emit({ row, col, data });
        }
      });
  }

  trackByFn(index: any, item: any) {
    return item.id; // unique id corresponding to the item
  }



  ngOnInit() {
    this.dataSource = new MatTableDataSource<T>([]);
    this.subscribe();
    this.headers = this.table.headers;
    this.tableColumns = this.table.columns;
    this.displayedColumns = this.table.displayedColumns;
    this.dataTable = this.table;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnDestroy(): void {

    this.unsubscribe();

  }


  private subscribe() {
    this.table.data.getData().subscribe(data => {
      this.tabledata = data;
      this.dataSource.data = data;
      this.isDataLoaded = true;
    });
  }


  private unsubscribe() {

    this.subscriptions.forEach(subscription => {

      subscription.unsubscribe();

    });

  }
}
