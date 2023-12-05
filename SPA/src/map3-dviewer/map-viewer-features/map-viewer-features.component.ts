import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-viewer-features',
  templateUrl: './map-viewer-features.component.html',
  styleUrls: ['./map-viewer-features.component.css']
})

export class MapViewerFeaturesComponent {

  isFeaturesVisible: boolean = true;
  isViewerVisible: boolean = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onClick() {
    this.isFeaturesVisible = false;
    this.isViewerVisible = true;
  }

}
