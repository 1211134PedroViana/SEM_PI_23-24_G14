import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { ElevatorService } from '../../elevatorService/elevator.service';
import Elevator from '../../elevatorService/elevator';
import Building from "../../buildingService/building";
import {BuildingService} from "../../buildingService/building.service"; // Adjust the path accordingly

@Component({
  selector: 'app-create-elevator-form',
  templateUrl: './create-elevator-form.component.html',
  styleUrls: ['./create-elevator-form.component.css']
})
export class CreateElevatorFormComponent {

  id: string = '';
  code: string = '';
  positionX: number = 0;
  positionY: number = 0;
  direction: string = '';
  buildingId: string = '';
  floorList: string = '';
  brand: string = '';
  model: string = '';
  serialNumber: string = '';
  description: string = '';
  buildings: Building[] = [];

  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService, private snackBar: MatSnackBar) { }

  closeForm() {
    this.elevatorService.closeForm();
  }

  onSubmit() {
    const elevatorData = {
      code: this.code,
      location: {
        positionX: this.positionX,
        positionY: this.positionY,
        direction: this.direction
      },
      buildingId: this.buildingId,
      floorList: this.floorList.split(',').map(floor => floor.trim()),
      brand: this.brand,
      model: this.model,
      serialNumber: this.serialNumber,
      description: this.description
    } as Elevator;

    this.elevatorService.addElevator(elevatorData)
      .pipe(
        tap((response) => {
          console.log('Elevator created successfully', response);
          const message = `Elevator created successfully! | Code: ${response.code} | Brand: ${response.brand} | Description: ${response.description}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Elevator', error);
          this.snackBar.open('Failed to create Elevator, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.buildingService.getAllBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
  }


}

