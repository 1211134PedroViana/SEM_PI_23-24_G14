import { Component } from '@angular/core';

@Component({
  selector: 'app-task-side-bar',
  templateUrl: './task-side-bar.component.html',
  styleUrls: ['./task-side-bar.component.css']
})
export class TaskSideBarComponent {

  userOptions: boolean = false;

  showOptions() {
    if(this.userOptions === true) {
      this.userOptions = false;
    }else{
      this.userOptions = true;
    }
  }
}
