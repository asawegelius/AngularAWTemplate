import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SideNavigationComponent,
    FooterComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterModule,
  ],
  exports:[
    SideNavigationComponent,
    FooterComponent,
  ]
})
export class ResponsiveSideNavigationModule { }
