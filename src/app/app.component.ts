import { Component } from '@angular/core';
import { SideNavigationComponent } from './modules/shared/features/layouts/responsive-side-navigation/side-navigation.component';

/**
 * The root component of the application.
 * @class
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideNavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
