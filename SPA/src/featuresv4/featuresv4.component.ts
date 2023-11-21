import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featuresv4',
  templateUrl: './featuresv4.component.html',
  styleUrls: ['./featuresv4.component.css']
})
export class Featuresv4Component {

  @Input() titleText: string = ' ';
  @Input() feature1ButtonText: string = ' ';
  @Input() feature2ButtonText: string = ' ';
  @Input() feature3ButtonText: string = ' ';
  @Input() feature4ButtonText: string = ' ';
  @Input() feature5ButtonText: string = ' ';
  @Input() feature1Route: string = ' ';
  @Input() feature2Route: string = ' ';
  @Input() feature3Route: string = ' ';
  @Input() feature4Route: string = ' ';
  @Input() feature5Route: string = ' ';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
