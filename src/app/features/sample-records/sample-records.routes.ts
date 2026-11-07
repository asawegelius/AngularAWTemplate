import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { Routes } from '@angular/router';
import { SampleRecordsPageComponent } from './pages/sample-records-page/sample-records-page.component';
import { SampleRecordEffects } from './state/sample-record.effects';
import { sampleRecordsFeature } from './state/sample-record.reducer';
import { SampleRecordApiService } from './data-access/sample-record-api.service';
import { SampleRecordsFacade } from './facade/sample-records.facade';

export const SAMPLE_RECORDS_ROUTES: Routes = [
  {
    path: '',
    component: SampleRecordsPageComponent,
    providers: [
      SampleRecordApiService,
      SampleRecordsFacade,
      provideState(sampleRecordsFeature),
      provideEffects(SampleRecordEffects)
    ]
  }
];
