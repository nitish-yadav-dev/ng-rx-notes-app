import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgRx-Notes-App';
  isSideBarOpen: boolean = false;
  events: string[] = [];
  opened: boolean;

  @ViewChild('sidenav') sidenav: MatSidenav;

  toggleSidebar() {
    this.isSideBarOpen = true
  }
  toggle() {
    this.sidenav.toggle().then(r => {
      console.log('asd', r)
    });
  }
}
