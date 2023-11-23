import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/floorService/floor-service';
import { catchError, tap } from 'rxjs/operators';
import Floor from 'src/floorService/floor'

@Component({
    selector: 'app-list-floorsFromABuilding',
    templateUrl: './list-floorsFromABuilding.component.html',
    styleUrls: ['./list-floorsFromABuilding.component.css']
})
export class ListFloorsFromABuildingComponent implements OnInit {

    floors: Floor[] = [];

    selectedFloor: any;

    selectedBuilding: any;

    constructor(private floorService: FloorService) { }

    ngOnInit(): void {
        this.loadFloors();
    }

    loadFloors() {
        this.floorService.getFloorsFromBuilding(this.selectedBuilding)
            .pipe(
                tap((response) => {
                    this.floors = response;
                    console.log('Floors from this building listed successfully', response);
                }),
                catchError((error) => {
                    console.error('Error occurred while listing the floors from this building', error);
                    throw error;
                }) 
            )
            .subscribe()
    }

    isFormOpen = false;
    openForm(floor: Floor) {
        // Pass floor data to the form component (e.g., using a service)
        this.floorService.openForm(floor);
        this.isFormOpen = true;
    }
}
