import { Injectable } from '@angular/core';
import { SampleRecord } from '../models/sample-record.interface';
import { TableService } from 'src/app/modules/shared/services/tables/table.service';

@Injectable({
  providedIn: 'root'
})
export class SampleRecordsTableService extends TableService<SampleRecord> {

  constructor() {
    super();
  }
}
