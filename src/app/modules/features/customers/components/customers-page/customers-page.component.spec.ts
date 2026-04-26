import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CustomersPageComponent } from './customers-page.component';

@Component({
  selector: 'app-customers',
  standalone: false,
  template: ''
})
class CustomersStubComponent {
  @Input() data: unknown;
}

describe('CustomersPageComponent', () => {
  let component: CustomersPageComponent;
  let fixture: ComponentFixture<CustomersPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersPageComponent, CustomersStubComponent ],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CustomersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
