import { Component, OnInit } from '@angular/core';
import { SampleRecordsComponent } from '../sample-records/sample-records.component';
import { SampleRecordsFacade } from '../../state/sample-records.facade';

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
  sampleRecords$ = this.sampleRecordsFacade.sampleRecords$;

  /**
   * Creates an instance of SampleRecordsPageComponent.
   * @constructor
   * @param {SampleRecordsFacade} sampleRecordsFacade - Facade for sample-record state access.
   */
  constructor(
    private sampleRecordsFacade: SampleRecordsFacade,
  ) { }

  /**
   * Lifecycle method called after component initialization.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadRecords();
  }

  /**
   * Requests sample records through the feature facade.
   * @returns {void}
   */
  loadRecords(): void {
    this.sampleRecordsFacade.loadSampleRecords();
  }

}

