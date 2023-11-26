import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {RobotTypeService} from "../../robotTypeService/robotType-service";
import RobotType from "../../robotTypeService/robotType"; // Adjust the path accordingly

@Component({
  selector: 'app-create-robot-type-form',
  templateUrl: './create-robot-type-form.component.html',
  styleUrls: ['./create-robot-type-form.component.css']
})
export class CreateRobotTypeFormComponent {
  code: string = "";
  brand: string = "";
  model: string = "";
  taskTypes: string[] = [];

  constructor(private robotTypeService: RobotTypeService, private snackBar: MatSnackBar) { }

  closeForm() {
    this.robotTypeService.closeForm();
  }

  onSubmit() {
    const robotTypeData = {
      code: this.code,
      brand: this.brand,
      model: this.model,
      taskTypes: this.taskTypes
    } as RobotType;

    this.robotTypeService.addRobotType(robotTypeData)
      .pipe(
        tap((response) => {
          console.log('Robot Type created successfully', response);
          const message = `Robot Type created successfully! | Code: ${response.code} | Brand: ${response.brand}}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Robot Type', error);
          this.snackBar.open('Failed to create Robot Type, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

}

