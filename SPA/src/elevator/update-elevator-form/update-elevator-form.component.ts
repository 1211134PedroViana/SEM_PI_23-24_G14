import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';
import {ElevatorService} from "../../elevatorService/elevator.service";
import Elevator from "../../elevatorService/elevator";

@Component({
  selector: 'app-update-elevator-form',
  templateUrl: './update-elevator-form.component.html',
  styleUrls: ['./update-elevator-form.component.css']
})

export class UpdateElevatorFormComponent {

  selectedElevator: any;

  constructor(private elevatorService: ElevatorService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.elevatorService.getElevator().subscribe((elevator) => {
      this.selectedElevator = elevator;
    });
    console.log(this.selectedElevator);
  }

  closeForm() {
    this.elevatorService.closeForm();
  }

  onSubmit() {

    let elevatorData = ({
      id: this.selectedElevator.id,
      code: this.selectedElevator.code,
      location: this.selectedElevator.location,
      buildingId: this.selectedElevator.buildingId,
      floorList: this.selectedElevator.floorList,
      brand: this.selectedElevator.brand,
      model: this.selectedElevator.model,
      serialNumber: this.selectedElevator.serialNumber,
      description: this.selectedElevator.description,
    }) as Elevator;

    this.elevatorService.updateElevator(elevatorData)
      .pipe(
        tap((response) => {
          console.log('Elevator updated successfully', response);
          const message = `Elevator updated successfully! | ID: ${response.id} | Code: ${response.code}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while updating the building, returned code:' + error.status);
          this.snackBar.open('Failed to updated building, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

}
