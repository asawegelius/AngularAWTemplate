import { Component, Input, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';

@Component({
  selector: 'app-modal',
  standalone: false,
  template: '<ng-content></ng-content>'
})
export class ModalStubComponent {
  @Input() size?: string;
}

@NgModule({
  declarations: [AccountDetailsComponent, ModalStubComponent]
})
class AccountDetailsTestModule {}

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailsTestModule]
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
