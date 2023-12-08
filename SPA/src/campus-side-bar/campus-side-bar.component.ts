import { Component } from '@angular/core';

@Component({
  selector: 'app-campus-side-bar',
  templateUrl: './campus-side-bar.component.html',
  styleUrls: ['./campus-side-bar.component.css']
})
export class CampusSideBarComponent {

  userOptions: boolean = false;

  showOptions() {
    if(this.userOptions === true) {
      this.userOptions = false;
    }else{
      this.userOptions = true;
    }
  }

}
