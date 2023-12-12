import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';
import { SystemUserService } from 'src/systemUserService/systemUser.service';
import { RobotTypeService } from 'src/robotTypeService/robotType-service';
import RobotType from 'src/robotTypeService/robotType';

@Component({
  selector: 'app-task-by-type',
  templateUrl: './task-by-type.component.html',
  styleUrls: ['./task-by-type.component.css']
})
export class TaskByTypeComponent {

  observables: Observable<any>[] = [];

  robotTypes: RobotType[] = [];
  selectedType: any;
  isFormVisible: boolean = true;
  isSurvVisible: boolean = false;
  isPickVisible: boolean = false;
  survTasks: SurveillanceTask[] = [];
  pickupTasks: PickupAndDeliveryTask[] = [];
  parsedSurvTasks: SurveillanceTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService, 
    private floorService: FloorService, private robotTypeService: RobotTypeService, private router: Router) { }

  closeForm() {
    this.router.navigate(["/user/searchTask"]);
  }

  ngOnInit() {
    this.robotTypeService.getAllRobotTypes().subscribe((robotTypes) => {
      this.robotTypes = robotTypes;
    });
  }

  onSubmit() {

    if(this.selectedType.taskTypes.length < 2) {
      this.robotTypeService.getTaskTypeById(this.selectedType.taskTypes[0]).subscribe((taskType) => {
        if(taskType.name === 'surveillance') {

          this.taskService.getAllSurveillanceTask()
          .pipe(
          tap((response) => {
          this.survTasks = response;
          this.parseSurvList();
          }),
          catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
          })
          )
          .subscribe()

        }else{

          this.taskService.getAllPickupAndDelivery()
          .pipe(
          tap((response) => {
          this.pickupTasks = response;
          }),
          catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
          })
          )
          .subscribe()

        }

      });


    } else {

      this.taskService.getAllSurveillanceTask()
      .pipe(
        tap((response) => {
          this.survTasks = response;
          this.parseSurvList();
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
        })
      )
      .subscribe()

    this.taskService.getAllPickupAndDelivery()
      .pipe(
        tap((response) => {
          this.pickupTasks = response;
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
        })
      )
      .subscribe()

    }
    
  }

  parseSurvList() {
    for(let i = 0; i < this.survTasks.length; i++) {
      let building: any;
      let user: any;
      let floors: string[] = [];

      this.userService.getUserById(this.survTasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          this.buildingService.getBuildingById(this.survTasks[i].buildingId)
          .pipe(
            tap((response) => {
              building = response;

              for(let j = 0; j < this.survTasks[i].floorIds.length; j++) {
                let observable: Observable<any> = this.floorService.getFloorById(this.survTasks[i].floorIds[j])
                .pipe(
                tap((response) => {
                  floors.push(response.floorNumber.toString())
                }),
                catchError((error) => {
                  console.error('Error occurred while getting the Floor', error);
                  throw error;
                })
                )
                this.observables.push(observable);
              }

              forkJoin(this.observables).subscribe((responses: any[]) => {
                const validResponses = responses.filter(response => response !== null);
                const floors = validResponses.map(response => response.floorNumber.toString());
              
                const surveillanceTask = {
                  buildingId: building.name,
                  floorIds: floors,
                  startPlace: this.survTasks[i].startPlace,
                  endPlace: this.survTasks[i].endPlace,
                  phoneNumber: this.survTasks[i].phoneNumber,
                  status: this.survTasks[i].status,
                  userId: user.email
                } as SurveillanceTask;
              
                this.parsedSurvTasks.push(surveillanceTask);
              });

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

}
