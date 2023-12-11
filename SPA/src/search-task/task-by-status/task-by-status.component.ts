import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';

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

  constructor(private taskService: TaskService, private buildingService: BuildingService, private floorService: FloorService, 
    private router: Router) { }

  closeForm() {
    this.router.navigate(["/user/searchTask"]);
  }

  onSubmit() {
    this.taskService.getByStatusSurveillanceTask(this.selectedStatus)
      .pipe(
        tap((response) => {
          this.survTasks = response;
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
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
        })
      )
      .subscribe()

      this.parseLists();
    
  }

  parseLists() {
    
  }

}
