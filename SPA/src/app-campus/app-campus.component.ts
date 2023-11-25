import { Component } from '@angular/core';

@Component({
  selector: 'app-campus',
  templateUrl: './app-campus.component.html',
  styleUrls: ['./app-campus.component.css']
})

export class AppCampusComponent {
  isVisible: boolean = true;

  ngOnDestroy() {
    this.isVisible = false;
  }
}
