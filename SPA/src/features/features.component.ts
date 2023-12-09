import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent {

  @Input() titleText: string = '';
  @Input() feature1ButtonText: string = '';
  @Input() feature2ButtonText: string = '';
  @Input() feature3ButtonText: string = '';
  @Input() feature1Route: string = '';
  @Input() feature2Route: string = '';
  @Input() feature3Route: string = '';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
