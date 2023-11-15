import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { RobotService } from 'src/robotService/robot-service';
import Robot from 'src/robotService/robot';

@Component({
    selector: 'app-list-robots',
    templateUrl: './list-robots.component.html',
    styleUrls: ['./list-robots.component.css']
})

export class ListRobotsComponent implements OnInit {

    robots: Robot[] = [];

    selectedRobot: any;

    constructor(private robotService: RobotService) { }

    ngOnInit(): void {
        this.loadRobots();
    }

    loadRobots() {
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
        .subscribe()
    }
}