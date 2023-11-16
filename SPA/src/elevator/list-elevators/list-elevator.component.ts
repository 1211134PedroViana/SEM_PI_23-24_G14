import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Elevator from "src/elevatorService/elevator";
import {ElevatorService} from "../../elevatorService/elevator.service";


@Component({
  selector: 'app-list-elevators',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent implements OnInit {

  elevators: Elevator[] = [];

  selectedElevator: any;

  constructor(private elevatorService: ElevatorService) { }

  ngOnInit(): void {
    this.loadElevators();
  }

  loadElevators() {
    this.elevatorService.getAllElevators()
      .pipe(
        tap((response) => {
          this.elevators = response;
          console.log('Elevators listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the buildings', error);
          throw error;
        })
      )
      .subscribe()
  }

  isFormOpen = false;
  openForm(elevator: Elevator) {
    // Pass building data to the form component (e.g., using a service)
    this.elevatorService.openForm(elevator);
    this.isFormOpen = true;
  }
}
