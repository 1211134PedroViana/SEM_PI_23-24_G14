import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RobotService } from 'src/robotService/robot-service';
import { catchError, tap } from 'rxjs/operators';
import Robot from 'src/robotService/robot';

@Component({
  selector: 'app-deactivate-robot',
  templateUrl: './deactivate-robot.component.html',
  styleUrls: ['./deactivate-robot.component.css']
})
export class DeactivateRobotComponent {

  robotId = "";
  robots: Robot[] = [];

  constructor(private robotService: RobotService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.robotService.getAllRobots().subscribe((robots) => {
      this.robots = robots;
    });
  }

  onSubmit() { 
    this.robotService.deactivateRobot(this.robotId)
        .pipe(
            tap((response) => {
                console.log('Robot deactivated', response);
                const message = `Robot deactivated successfully! | Code: ${response.code} | Nickname: ${response.nickname} | Active: ${response.isActive}`;
                this.snackBar.open(message, 'Close', {
                    duration: 5000, //5 seconds
                });
            }),
            catchError((error) => {
                console.error('Error occurred while deactivating the Robot', error);
                this.snackBar.open('Failed to deactivate robot, returned code:' + error.status, 'Close', {
                    duration: 5000, //5 seconds
                });
                throw error;
            }) 
        )
        .subscribe();
  }

}
