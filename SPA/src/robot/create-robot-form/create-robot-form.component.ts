import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import Robot from 'src/robotService/robot';
import { RobotService } from '../../robotService/robot.service';

@Component({
    selector: 'app-create-robot-form',
    templateUrl: './create-robot-form.component.html',
    styleUrls: ['./create-robot-form.component.css']
})

export class CreateRobotFormComponent {

    code: string = " ";
    name: string = " ";
    robotType: string = " ";
    serialNumber: number = 0;
    description: string = " ";

    constructor(private robotService: RobotService, private snackBar: MatSnackBar) { }

    closeForm() {
        this.robotService.closeForm();
    }

    onSubmit() {
        const robotData = ({
            code: this.code,
            nickname: this.name,
            robotType: this.robotType,
            serialNumber: this.serialNumber,
            description: this.description
        }) as Robot;
    

    this.robotService.addRobot(robotData)
        .pipe(
            tap((response) => {
                console.log('Robot created robot', response);
                const message = `Robot created successfully! | ID: ${response.id} | Code: ${response.code} | Nickname: ${response.nickname} | RobotType: ${response.robotType} | Descriptio: ${response.description}`;
                this.snackBar.open(message, 'Close', {
                    duration: 5000, //5 seconds
                });
            }),
            catchError((error) => {
                console.error('Error occurred while creating the Robot', error);
                this.snackBar.open('Failed to create robot, returned code:' + error.status, 'Close', {
                    duration: 5000, //5 seconds
                });
                throw error;
            }) 
        )
        .subscribe();
    }
}



