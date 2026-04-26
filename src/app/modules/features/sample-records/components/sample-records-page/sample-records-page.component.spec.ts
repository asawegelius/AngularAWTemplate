import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SampleRecordsComponent } from '../sample-records/sample-records.component';
import { SampleRecordsPageComponent } from './sample-records-page.component';

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
  let store: MockStore;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [SampleRecordsPageComponent, SampleRecordsStubComponent],
      providers: [provideMockStore()]
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
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SampleRecordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
