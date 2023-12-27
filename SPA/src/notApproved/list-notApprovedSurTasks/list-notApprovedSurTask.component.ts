import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import SurveillanceTask from "../../taskService/surveillanceTask";
import {TaskService} from "../../taskService/task.service";
import { FloorService } from 'src/floorService/floor-service';
import { Router } from '@angular/router';
import { SystemUserService } from 'src/systemUserService/systemUser.service';
import { BuildingService } from 'src/buildingService/building.service';


@Component({
  selector: 'app-list-notApprovedSurTask',
  templateUrl: './list-notApprovedSurTask.component.html',
  styleUrls: ['./list-notApprovedSurTasks.component.css']
})
export class ListNotApprovedSurTaskComponent implements OnInit {

  tasks: SurveillanceTask[] = [];
  parsedSurvTasks: SurveillanceTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService,
    private floorService: FloorService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.loadTasksByStatus("Pending");
    this.loadTasksByStatus("Reject");
  }

  loadTasksByStatus(status: string) {
    this.taskService.getByStatusSurveillanceTask(status)
      .pipe(
        tap((response) => {
          if (status === "Pending") {
            this.tasks = response;
            this.parseSurvList();
          } else if (status === "Reject") {
            this.tasks = response;
          }
          console.log(`Tasks with status '${status}' listed successfully`, response);
        }),
        catchError((error) => {
          console.error(`Error occurred while listing tasks with status '${status}'`, error);
          throw error;
        })
      )
      .subscribe();
  }

  parseSurvList() {
    for(let i = 0; i < this.tasks.length; i++) {
      let building: any;
      let user: any;
      let floor: any;

      this.userService.getUserById(this.tasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          this.buildingService.getBuildingById(this.tasks[i].buildingId)
          .pipe(
            tap((response) => {
              building = response;

              this.floorService.getFloorById(this.tasks[i].floorId)
                .pipe(
                tap((response) => {
                  floor =  response;

                  const surveillanceTask = {
                    buildingId: building.name,
                    floorId: floor.floorNumber,
                    startPlace: this.tasks[i].startPlace,
                    endPlace: this.tasks[i].endPlace,
                    phoneNumber: this.tasks[i].phoneNumber,
                    status: this.tasks[i].status,
                    userId: user.email
                  } as SurveillanceTask;
                
                  this.parsedSurvTasks.push(surveillanceTask);
                }),
                catchError((error) => {
                  console.error('Error occurred while getting the Floor', error);
                  throw error;
                })
                )
                .subscribe()

            }),
          catchError((error) => {
          console.error('Error occurred while getting the Building', error);
          throw error;
        })
        )
        .subscribe()

        }),
        catchError((error) => {
          console.error('Error occurred while getting the User', error);
          throw error;
        })
      )
      .subscribe()  

    }
  }
    isFormOpen = false;

  openForm(tasks: SurveillanceTask) {
    this.taskService.openForm(tasks);
    this.isFormOpen = true;
  }
}
