import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-surveillance-tasks',
  templateUrl: './surveillance-tasks.component.html',
  styleUrls: ['./surveillance-tasks.component.css']
})
export class ApproveDenySurveillanceTasksComponent {

  observables: Observable<any>[] = [];

  selectedStatus = 'Pending';
  isFormVisible: boolean = true;
  isListVisible: boolean = false;
  survTasks: SurveillanceTask[] = [];
  parsedSurvTasks: SurveillanceTask[] = [];
  isVisible: boolean = false;

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService,
    private floorService: FloorService, private router: Router) { }

  closeForm() {
    this.isListVisible = false;
    this.router.navigate(["/task/approveOrDenyTask"]);
  }

  ngOnInit() {
    this.loadSurvTasks();
    this.taskService.getFormVisibility().subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

  loadSurvTasks() {
    this.taskService.getByStatusSurveillanceTask(this.selectedStatus)
      .pipe(
        tap((response) => {
          this.survTasks = response;
          this.parseSurvList();
          console.log('Surveillance Tasks listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the Suveillance Tasks', error);
          throw error;
        })
      )
      .subscribe()
  }

  parseSurvList() {
    for(let i = 0; i < this.survTasks.length; i++) {
      let building: any;
      let user: any;
      let floor: any;

      this.userService.getUserById(this.survTasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          this.buildingService.getBuildingById(this.survTasks[i].buildingId)
          .pipe(
            tap((response) => {
              building = response;

              this.floorService.getFloorById(this.survTasks[i].floorId)
                .pipe(
                tap((response) => {
                  floor =  response;

                  const surveillanceTask = {
                    buildingId: building.name,
                    floorId: floor.floorNumber,
                    startPlace: this.survTasks[i].startPlace,
                    endPlace: this.survTasks[i].endPlace,
                    phoneNumber: this.survTasks[i].phoneNumber,
                    status: this.survTasks[i].status,
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
  openForm(task: SurveillanceTask) {
    // Pass task data to the form component (e.g., using a service)
    this.taskService.openForm(task);
    this.isFormOpen = true;
  }
}
