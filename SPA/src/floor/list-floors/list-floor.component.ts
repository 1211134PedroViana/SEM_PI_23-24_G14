import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Elevator from "src/elevatorService/elevator";
import {ElevatorService} from "../../elevatorService/elevator.service";
import Floor from "../../floorService/floor";
import {FloorService} from "../../floorService/floor-service";


@Component({
  selector: 'app-list-elevators',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.css']
})
export class ListFloorComponent implements OnInit {

  floors: Floor[] = [];

  selectedFloor: any;

  constructor(private floorService: FloorService) { }

  ngOnInit(): void {
    this.loadElevators();
  }

  loadElevators() {
    this.floorService.getAllFloors()
      .pipe(
        tap((response) => {
          this.floors = response;
          console.log('Floors listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the Floors', error);
          throw error;
        })
      )
      .subscribe()
  }

  isFormOpen = false;
  openForm(floor: Floor) {
    // Pass building data to the form component (e.g., using a service)
    this.floorService.openForm(floor);
    this.isFormOpen = true;
  }
}
