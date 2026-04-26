import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationComponent } from './side-navigation.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { ResponsiveSideNavigationModule } from './responsive-side-navigation.module';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  const mediaQueryListMock = {
    matches: false,
    media: '(max-width: 600px)',
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false
  } as unknown as MediaQueryList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ResponsiveSideNavigationModule
      ],
      providers: [
        {
          provide: MediaMatcher,
          useValue: {
            matchMedia: () => mediaQueryListMock
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize mobileQuery', () => {
    expect(component.mobileQuery.media).toBe('(max-width: 600px)');
  });

  it('should remove event listener on destroy', () => {
    spyOn(component.mobileQuery, 'removeEventListener');
    component.ngOnDestroy();
    expect(component.mobileQuery.removeEventListener).toHaveBeenCalled();
  });
  
});
