import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SidenavService } from '../../services/sidenav.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sideNavService: SidenavService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [SidenavService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    sideNavService = TestBed.inject(SidenavService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle side navigation', () => {
    const spy = spyOn(sideNavService, 'toggle');
    component.toggleSidenav();
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
