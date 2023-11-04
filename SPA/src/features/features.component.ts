import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent {

  @Input() titleText: string = ' ';
  @Input() createButtonText: string = ' ';
  @Input() updateButtonText: string = ' ';
  @Input() listButtonText: string = ' ';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
