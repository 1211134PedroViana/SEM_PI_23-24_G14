import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';

@Component({
  selector: 'app-list-buildingsWithMinAndMaxFloors',
  templateUrl: './list-buildingsWithMinAndMaxFloors.component.html',
  styleUrls: ['./list-buildingsWithMinAndMaxFloors.component.css']
})
export class ListBuildingsWithMinAndMaxFloorsComponent implements OnInit {

  buildings: Building[] = [];
  selectedBuilding: any;
  min: any;
  max: any;
  formSubmitted = false; //Control

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {

  }

  loadBuildings() {
    console.log('Min:', this.min);
    console.log('Max:', this.max);
  
    this.buildingService.getAllBuildingsWithMinAndMaxFloors(this.min, this.max)
      .pipe(
        tap((response) => {
          this.buildings = response;
          console.log('Buildings listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error listing the buildings', error);
          throw error;
        })
      )
      .subscribe();
  }  
  
  isFormOpen = false;
  openForm(building: Building) {
    this.buildingService.openForm(building);
    this.isFormOpen = true;
  }

  submitForm() {
    if (this.min !== undefined && this.max !== undefined) {
      this.loadBuildings();
      this.formSubmitted = true; 
    } else {
      console.warn('Please, write min and max values.');
    }
  }
}
