import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { Routes } from '@angular/router';
import { SampleRecordsPageComponent } from './components/sample-records-page/sample-records-page.component';
import { SampleRecordEffects } from './state/effects/sample-record.effects';
import { reducer, sampleRecordsFeatureKey } from './state/reducers/sample-record.reducer';

export const SAMPLE_RECORDS_ROUTES: Routes = [
  {
    path: '',
    component: SampleRecordsPageComponent,
    providers: [
      provideState(sampleRecordsFeatureKey, reducer),
      provideEffects(SampleRecordEffects)
    ]
  }
];
