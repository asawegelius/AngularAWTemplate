import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SampleRecordsComponent } from '../sample-records/sample-records.component';
import { loadSampleRecords } from '../../state/actions/sample-record.actions';
import * as fromSampleRecords from '../../state/selectors/sample-record.selectors';

/**
 * Component for displaying sample records.
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sample-records-page',
  standalone: true,
  imports: [SampleRecordsComponent],
  templateUrl: './sample-records-page.component.html',
  styleUrls: ['./sample-records-page.component.scss']
})
export class SampleRecordsPageComponent implements OnInit {

  /** An observable that emits the sample records. */
  sampleRecords$ = this.store.select(fromSampleRecords.selectSampleRecordList);

  /**
   * Creates an instance of SampleRecordsPageComponent.
   * @constructor
   * @param {Store} store - The NgRx store.
   */
  constructor(
    private store: Store,
  ) { }

  /**
   * Lifecycle method called after component initialization.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadRecords();
  }

  /**
   * Dispatches an action to load sample records from the store.
   * @returns {void}
   */
  loadRecords(): void {
    this.store.dispatch(loadSampleRecords());
  }

}

