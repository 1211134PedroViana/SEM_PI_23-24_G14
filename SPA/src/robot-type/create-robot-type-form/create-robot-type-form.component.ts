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
    
  }

}

