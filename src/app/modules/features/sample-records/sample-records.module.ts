import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSampleRecords from './state/reducers/sample-record.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SampleRecordEffects } from './state/effects/sample-record.effects';
import { SampleRecordsPageComponent } from './components/sample-records-page/sample-records-page.component';
import { SampleRecordsComponent } from './components/sample-records/sample-records.component';
import { SampleRecordsRoutingModule } from './sample-records-routing.module';
import { TableWithEditCellModule } from '../../shared/components/tables/table-with-edit-cell/table-with-edit-cell.module';



@NgModule({
  declarations: [
    SampleRecordsComponent,
    SampleRecordsPageComponent
  ],
  imports: [
    CommonModule,
    TableWithEditCellModule,
    SampleRecordsRoutingModule,
    StoreModule.forFeature(fromSampleRecords.sampleRecordsFeatureKey, fromSampleRecords.reducer),
    EffectsModule.forFeature([SampleRecordEffects])
  ]
})
export class SampleRecordsModule { }
