import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../floorService/floor-service';
import { catchError, tap } from 'rxjs/operators';
import Floor from '../../floorService/floor';
import { ElevatorService } from 'src/elevatorService/elevator.service';


@Component({
  selector: 'app-list-floorsWithElevator',
  templateUrl: './list-floorsWithElevator.component.html',
  styleUrls: ['./list-floorsWithElevator.component.css']
})
export class ListFloorsWithElevatorComponent implements OnInit {

  floors: Floor[] = [];

  selectedFloor: any;

  constructor(private floorService: FloorService) { }


  ngOnInit(): void {
    this.loadFloors();
  }

  loadFloors() {
    this.floorService.getAllFloorsWithElevator()
      .pipe(
        tap((response) => {
          this.floors = response;
          console.log('Floors with elevator listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the floors with elevator', error);
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
