import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import SurveillanceTask from "../../taskService/surveillanceTask";
import {TaskService} from "../../taskService/task.service";
import PickupAndDeliveryTask from "../../taskService/pickupAndDeliveryTask";


@Component({
  selector: 'app-list-elevators',
  templateUrl: './list-notApprovedPicTask.component.html',
  styleUrls: ['./list-notApprovedPicTasks.component.css']
})
export class ListNotApprovedPicTaskComponent implements OnInit {

  tasks: PickupAndDeliveryTask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.loadTasksByStatus("Pending");
    this.loadTasksByStatus("Reject");
  }

  loadTasksByStatus(status: string) {
    this.taskService.getByStatusPickupAndDelivery(status)
      .pipe(
        tap((response) => {
          if (status === "Pending") {
            this.tasks = response;
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

    isFormOpen = false;

  openForm(tasks: SurveillanceTask) {
    this.taskService.openForm(tasks);
    this.isFormOpen = true;
  }

  openForm1(tasks: PickupAndDeliveryTask) {
    this.taskService.openForm1(tasks);
    this.isFormOpen = true;
  }
}
