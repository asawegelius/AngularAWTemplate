import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

}
