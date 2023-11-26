import { Component, OnInit } from '@angular/core';
import { ElevatorService } from 'src/elevatorService/elevator.service'; 

@Component({
  selector: 'app-list-floors-with-elevator',
  templateUrl: './list-floors-with-elevator.component.html',
  styleUrls: ['./list-floors-with-elevator.component.css']
})
export class ListFloorsWithElevatorComponent implements OnInit {

  floorsWithElevators: any[] = [];

  constructor(private elevatorService: ElevatorService) { } // Update the service

  ngOnInit(): void {
    this.loadFloorsWithElevators();
  }

  loadFloorsWithElevators() {
    this.elevatorService.getAllFloorsServedByElevator()
      .subscribe({
        next: response => {
          this.floorsWithElevators = response;
          console.log('Floors with elevators listed successfully', response);
        },
        error: error => {
          console.error('Error occurred while listing floors with elevators', error);
          // Handle error, show a message, etc.
        }
      });
  }
}
