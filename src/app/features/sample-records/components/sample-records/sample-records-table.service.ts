import { Injectable } from '@angular/core';
import { SampleRecord } from '../../models/sample-record.interface';
import { TableService } from '@shared/components/tables/table.service';

@Injectable()
export class SampleRecordsTableService extends TableService<SampleRecord> {

  constructor() {
    super();
  }
}
