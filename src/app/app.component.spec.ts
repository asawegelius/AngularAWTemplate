import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ResponsiveSideNavigationModule } from './modules/shared/features/layouts/responsive-side-navigation/responsive-side-navigation.module';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  template: ''
})
export class SideNavigationStubComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [AppComponent, SideNavigationStubComponent]
    });

    testBed.overrideComponent(AppComponent, {
      remove: {
        imports: [ResponsiveSideNavigationModule]
      },
      add: {
        imports: [SideNavigationStubComponent]
      }
    });

    await testBed.compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
