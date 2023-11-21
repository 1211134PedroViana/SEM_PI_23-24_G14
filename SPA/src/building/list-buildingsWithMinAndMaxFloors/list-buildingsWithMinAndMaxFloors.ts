import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';

@Component({
    selector: 'app-list-buildingsWithMinAndMaxFloors',
    templateUrl: './list-buildingsWithMinAndMaxFloors.html',
    styleUrls: ['./list-buildingsWithMinAndMaxFloors.component.css']
})

export class ListBuildingsWithMinAndMaxFloorsComponent implements OnInit {

    buildings: Building[] = [];

    selectedBuilding: any;

    min: any;
    max: any;

    constructor(private buildingService: BuildingService) { }

    ngOnInit(): void {
        this.loadBuildings();
    }

    loadBuildings() {
        this.buildingService.getAllBuildingsWithMinAndMaxFloors(this.min, this.max)
            .pipe(
                tap((response) => {
                    this.buildings = response;
                    console.log('Buildings listed successfully', response);
                }),
                catchError((error) => {
                    console.error('Error occurred while listing the buildings', error);
                    throw error;
                }) 
            )
            .subscribe()
    }

    isFormOpen = false;
    openForm(building: Building) {
      // Pass building data to the form component (e.g., using a service)
      this.buildingService.openForm(building);
      this.isFormOpen = true;
    }
} 