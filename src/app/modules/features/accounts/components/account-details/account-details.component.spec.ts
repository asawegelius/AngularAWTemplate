import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';

@Component({
  selector: 'app-modal',
  standalone: false,
  template: '<ng-content></ng-content>'
})
class ModalStubComponent {
  @Input() size?: string;
}

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailsComponent, ModalStubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
