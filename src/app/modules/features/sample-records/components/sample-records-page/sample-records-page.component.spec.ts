import { Component, Input, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SampleRecordsPageComponent } from './sample-records-page.component';

@Component({
  selector: 'app-sample-records',
  standalone: false,
  template: ''
})
export class SampleRecordsStubComponent {
  @Input() data: unknown;
}

@NgModule({
  declarations: [SampleRecordsPageComponent, SampleRecordsStubComponent]
})
class SampleRecordsPageTestModule {}

describe('SampleRecordsPageComponent', () => {
  let component: SampleRecordsPageComponent;
  let fixture: ComponentFixture<SampleRecordsPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleRecordsPageTestModule],
      providers: [provideMockStore()]
    })
    .compileComponents();
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
