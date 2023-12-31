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

@Component({
  selector: 'app-task-by-status',
  templateUrl: './task-by-status.component.html',
  styleUrls: ['./task-by-status.component.css']
})
export class TaskByStatusComponent {

  selectedStatus = '';
  isFormVisible: boolean = true;
  isListVisible: boolean = false;
  survTasks: SurveillanceTask[] = [];
  pickupTasks: PickupAndDeliveryTask[] = [];
  parsedSurvTasks: SurveillanceTask[] = [];
  parsedPickTasks: PickupAndDeliveryTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService, 
    private floorService: FloorService, private router: Router) { }

  closeForm() {
    this.isListVisible = false;
    this.router.navigate(["/task/searchTask"]);
  }

  onSubmit() {

    this.taskService.getByStatusSurveillanceTask(this.selectedStatus)
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

    this.taskService.getByStatusPickupAndDelivery(this.selectedStatus)
      .pipe(
        tap((response) => {
          this.pickupTasks = response;
          this.parsePickList();
          this.isFormVisible = false;
          this.isListVisible = true;
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
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
                  floor = response;

                  const surveillanceTask = {
                    code: this.survTasks[i].code,
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

  parsePickList() {
    for(let i = 0; i < this.pickupTasks.length; i++) {
      let user: any;

      this.userService.getUserById(this.pickupTasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          const pickupAndDeliveryTask = ({
            code: this.pickupTasks[i].code,
            pickupPlace: this.pickupTasks[i].pickupPlace,
            deliveryPlace: this.pickupTasks[i].deliveryPlace,
            pickupPersonName: this.pickupTasks[i].pickupPersonName,
            pickupPersonPhoneNumber: this.pickupTasks[i].pickupPersonPhoneNumber,
            deliveryPersonName: this.pickupTasks[i].deliveryPersonName,
            deliveryPersonPhoneNumber: this.pickupTasks[i].deliveryPersonPhoneNumber,
            description: this.pickupTasks[i].description,
            confirmationCode: this.pickupTasks[i].confirmationCode,
            status: this.pickupTasks[i].status,
            userId: user.email
          }) as PickupAndDeliveryTask;

          this.parsedPickTasks.push(pickupAndDeliveryTask);

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
