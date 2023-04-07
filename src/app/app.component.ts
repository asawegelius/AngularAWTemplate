import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * The root component of the application.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The `MatSidenav` component for the application.
   * @type {MatSidenav}
   */
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
}
