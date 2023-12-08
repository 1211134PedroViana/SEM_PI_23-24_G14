import { Component } from '@angular/core';

@Component({
  selector: 'app-campus-side-bar',
  templateUrl: './campus-side-bar.component.html',
  styleUrls: ['./campus-side-bar.component.css']
})
export class CampusSideBarComponent {

  userOptions: boolean = false;

  showOptions() {
    this.userOptions = true;
  }

}
