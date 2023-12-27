import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import SurveillanceTask from "../../taskService/surveillanceTask";
import {TaskService} from "../../taskService/task.service";
import PickupAndDeliveryTask from "../../taskService/pickupAndDeliveryTask";
import { SystemUserService } from 'src/systemUserService/systemUser.service';


@Component({
  selector: 'app-list-notApprovedPicTask',
  templateUrl: './list-notApprovedPicTask.component.html',
  styleUrls: ['./list-notApprovedPicTasks.component.css']
})
export class ListNotApprovedPicTaskComponent implements OnInit {

  tasks: PickupAndDeliveryTask[] = [];
  parsedTasks: PickupAndDeliveryTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService) { }

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
            this.parsePickList();
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

  parsePickList() {
    for(let i = 0; i < this.tasks.length; i++) {
      let user: any;

      this.userService.getUserById(this.tasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          const pickupAndDeliveryTask = ({
            pickupPlace: this.tasks[i].pickupPlace,
            deliveryPlace: this.tasks[i].deliveryPlace,
            pickupPersonName: this.tasks[i].pickupPersonName,
            pickupPersonPhoneNumber: this.tasks[i].pickupPersonPhoneNumber,
            deliveryPersonName: this.tasks[i].deliveryPersonName,
            deliveryPersonPhoneNumber: this.tasks[i].deliveryPersonPhoneNumber,
            description: this.tasks[i].description,
            confirmationCode: this.tasks[i].confirmationCode,
            status: this.tasks[i].status,
            userId: user.email
          }) as PickupAndDeliveryTask;

          this.parsedTasks.push(pickupAndDeliveryTask);

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

  openForm1(tasks: PickupAndDeliveryTask) {
    this.taskService.openForm1(tasks);
    this.isFormOpen = true;
  }
}
