import { Component } from '@angular/core';
import { BuildingService } from 'src/buildingService/building.service';

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent {

  isVisible: boolean = false;

  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
    this.buildingService.getFormVisibility().subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

}
