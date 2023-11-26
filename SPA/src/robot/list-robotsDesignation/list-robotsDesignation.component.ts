import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { RobotService } from 'src/robotService/robot-service';
import Robot from 'src/robotService/robot';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-robotsDesignation',
  templateUrl: './list-robotsDesignation.component.html',
  styleUrls: ['./list-robotsDesignation.component.css']
})

export class ListRobotsDesignationComponent implements OnInit {

  robots: Robot[] = [];
  name: string = '';
  taskType: string = '';
  constructor(private robotService: RobotService) { }
  ngOnInit(): void {
    this.loadRobots();
  }

  loadRobots() {
    if (this.name || this.taskType) {
      this.robotService.findRobotsByNicknameOrTaskType(this.name, this.taskType)
          .pipe(
              tap((response) => {
                this.robots = response;
                console.log('Robots listed successfully', response);
              }),
              catchError((error) => {
                console.error('Error occurred while listing the robots', error);
                throw error;
              })
          )
          .subscribe();
    } else {
      this.robotService.getAllRobots()
          .pipe(
              tap((response) => {
                this.robots = response;
                console.log('Robots listed successfully', response);
              }),
              catchError((error) => {
                console.error('Error occurred while listing the robots', error);
                throw error;
              })
          )
          .subscribe();
    }
  }

  isFormOpen = false;

  openForm(robot: Robot) {
    this.robotService.openForm(robot);
    this.isFormOpen = true;
  }
}
