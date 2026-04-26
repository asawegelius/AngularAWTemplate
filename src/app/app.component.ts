import { Component } from '@angular/core';
import { ResponsiveSideNavigationModule } from './modules/shared/features/layouts/responsive-side-navigation/responsive-side-navigation.module';

/**
 * The root component of the application.
 * @class
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResponsiveSideNavigationModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
