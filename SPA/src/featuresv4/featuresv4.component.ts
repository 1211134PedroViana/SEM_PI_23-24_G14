import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featuresv4',
  templateUrl: './featuresv4.component.html',
  styleUrls: ['./featuresv4.component.css']
})
export class Featuresv4Component {

  @Input() titleText: string = ' ';
  @Input() createButtonText: string = ' ';
  @Input() updateButtonText: string = ' ';
  @Input() listButtonText: string = ' ';
  @Input() extraButtonText: string = ' ';
  @Input() createRoute: string = ' ';
  @Input() updateRoute: string = ' ';
  @Input() listRoute: string = ' ';
  @Input() extraRoute: string = ' ';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
