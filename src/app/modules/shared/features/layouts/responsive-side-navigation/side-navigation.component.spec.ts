import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationComponent } from './side-navigation.component';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavigationComponent ],      
      providers: [
        ChangeDetectorRef,
        MediaMatcher
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
