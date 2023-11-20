import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import RobotType from 'src/robotTypeService/robotType';
import { RobotTypeService } from 'src/robotTypeService/robotType-service';
import TaskType from 'src/robotTypeService/taskType';

@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent {

  checkboxValues: boolean[] = [false, false];
  tasktype: string[] = ["pickup & delivery", "vigillance"];
  code: string = " "; 
  brand: string = " "; 
  model: string = " ";
  taskTypes: string[] = [];
  task: any;

  constructor(private robotTypeService: RobotTypeService, private snackBar: MatSnackBar) { }

  onSubmit() {
    for(let i = 0; i < this.checkboxValues.length; i++) {
      if(this.checkboxValues[i] === true) {
        this.robotTypeService.getTaskType(this.tasktype[i]).subscribe((taskType : TaskType) => {
          this.task = taskType;
          console.log("task:" + taskType.id)
          this.taskTypes.push(taskType.id);

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
                const message = `RobotType created successfully! | Code: ${response.code} | Brand: ${response.brand} | Model: ${response.model}`;
                this.snackBar.open(message, 'Close', {
                  duration: 5000, // 5 seconds
                });
              }),
              catchError((error) => {
                console.error('Error occurred while creating the RobotType', error);
                this.snackBar.open('Failed to create RobotType, returned code:' + error.status, 'Close', {
                  duration: 5000, // 5 seconds
                });
                throw error;
              })
            )
            .subscribe();
        });
      }
    }
  }

}
