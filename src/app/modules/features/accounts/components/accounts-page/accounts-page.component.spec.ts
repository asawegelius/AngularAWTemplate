import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsPageComponent } from './accounts-page.component';
import { MatButtonModule } from '@angular/material/button';
import { provideMockStore } from '@ngrx/store/testing';

describe('AccountsPageComponent', () => {
  let component: AccountsPageComponent;
  let fixture: ComponentFixture<AccountsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsPageComponent ],
      imports: [MatButtonModule],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
