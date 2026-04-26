import { DestroyRef, Component, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { EditRowInfo } from 'src/app/modules/shared/models/edit-row-info';
import { Table, TableColumn, TableHeader } from 'src/app/modules/shared/models/table';
import { TableWithEditCellComponent } from 'src/app/modules/shared/components/tables/table-with-edit-cell/table-with-edit-cell.component';
import { SampleRecord } from '../../models/sample-record.interface';
import { SampleRecordsTableService } from '../../services/sample-records-table.service';

@Component({
  selector: 'app-sample-records',
  standalone: true,
  imports: [TableWithEditCellComponent],
  templateUrl: './sample-records.component.html',
  styleUrls: ['./sample-records.component.scss']
})
export class SampleRecordsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input()
  data!: Observable<SampleRecord[]>;

  readonly table = this.getTable();

  constructor(private dataService: SampleRecordsTableService) { }

  getTable(): Table<SampleRecord> {
    const headers: TableHeader[] = [
      new TableHeader('Record id', true),
      new TableHeader('Title', true),
      new TableHeader('Owner', true),
      new TableHeader('Phone', true),
      new TableHeader('Email', true),
      new TableHeader('Created at', true),
      new TableHeader('Category', true)
    ];

    const columns: TableColumn[] = [
      new TableColumn('id', false),
      new TableColumn('title', false),
      new TableColumn('owner', false),
      new TableColumn('phone', false),
      new TableColumn('email', false),
      new TableColumn('createdAt', false),
      new TableColumn('categoryLabel', false)
    ];

    return new Table(headers, columns, this.dataService, ['owner', 'phone']);
  }

  update(editRowInfo: EditRowInfo) {
    console.warn(editRowInfo);
  }

  ngOnInit(): void {
    this.data?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      const initialData: SampleRecord[] = [];
      data.forEach(element => {
        const sampleRecord = { ...element, categoryLabel: element.category.label };
        initialData.push(sampleRecord);
      });
      this.dataService.setData(initialData);
    });
  }
}
