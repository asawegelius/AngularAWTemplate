import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SampleRecordsComponent } from '../sample-records/sample-records.component';
import { SampleRecordsPageComponent } from './sample-records-page.component';
import { SampleRecordsFacade } from '../../state/sample-records.facade';
import type { Mocked } from 'vitest';

@Component({
  selector: 'app-sample-records',
  standalone: true,
  template: ''
})
export class SampleRecordsStubComponent {
  @Input() data: unknown;
}

describe('SampleRecordsPageComponent', () => {
  let component: SampleRecordsPageComponent;
  let fixture: ComponentFixture<SampleRecordsPageComponent>;
  let sampleRecordsFacade: Mocked<Pick<SampleRecordsFacade, 'sampleRecords$' | 'loadSampleRecords'>>;

  beforeEach(async () => {
    sampleRecordsFacade = {
      sampleRecords$: of([]),
      loadSampleRecords: vi.fn()
    } as unknown as Mocked<Pick<SampleRecordsFacade, 'sampleRecords$' | 'loadSampleRecords'>>;

    const testBed = TestBed.configureTestingModule({
      imports: [SampleRecordsPageComponent, SampleRecordsStubComponent],
      providers: [
        { provide: SampleRecordsFacade, useValue: sampleRecordsFacade }
      ]
    });

    testBed.overrideComponent(SampleRecordsPageComponent, {
      remove: {
        imports: [SampleRecordsComponent]
      },
      add: {
        imports: [SampleRecordsStubComponent]
      }
    });

    await testBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRecordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sample records on init', () => {
    expect(sampleRecordsFacade.loadSampleRecords).toHaveBeenCalled();
  });
});
