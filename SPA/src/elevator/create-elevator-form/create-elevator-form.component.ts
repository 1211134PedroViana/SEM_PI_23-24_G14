import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { ElevatorService } from '../../elevatorService/elevator.service';
import Elevator from '../../elevatorService/elevator';
import Building from "../../buildingService/building";
import {BuildingService} from "../../buildingService/building.service";
import Floor from "../../floorService/floor";
import {FloorService} from "../../floorService/floor-service"; // Adjust the path accordingly

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
  brand: string = '';
  model: string = '';
  serialNumber: string = '';
  description: string = '';
  buildings: Building[] = [];
  floorList: string[] = []; // Inicialize como uma matriz vazia
  floors: any[] = [];



  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService, private floorService : FloorService, private snackBar: MatSnackBar) { }

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
      floorList: this.selectedFloors,
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
    this.floorService.getAllFloors().subscribe((floors) => {
      this.floors = floors;
    });
  }
  get selectedFloors(): string[] {
    return this.floors.filter(floor => floor.selected).map(floor => floor.id);
  }

}

