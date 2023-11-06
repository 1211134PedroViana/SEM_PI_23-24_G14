import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import RobotType from 'src/robotTypeService/robotType';
import { RobotTypeService } from 'src/robotTypeService/robotType-service';

@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent {

  checkboxValues: boolean[] = [false, false];
  code: string = " "; 
  brand: string = " "; 
  model: string = " ";
  taskTypes: string[] = [];

  constructor(private robotTypeService: RobotTypeService) { }

  onSubmit() {
    const robotTypeData = ({
      code: this.code,
      brand: this.brand,
      model: this.model,
      taskTypes: this.taskTypes
    }) as RobotType;

    this.robotTypeService.createRobotType(robotTypeData)
      .pipe(
        tap((response) => {
          console.log('RobotType created successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while creating the RobotType', error);
          throw error;
        })
      )
      .subscribe();
  }

}
