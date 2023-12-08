import { Component } from '@angular/core';

@Component({
  selector: 'app-fleet-side-bar',
  templateUrl: './fleet-side-bar.component.html',
  styleUrls: ['./fleet-side-bar.component.css']
})
export class FleetSideBarComponent {

  userOptions: boolean = false;

  showOptions() {
    if(this.userOptions === true) {
      this.userOptions = false;
    }else{
      this.userOptions = true;
    }
  }
}
