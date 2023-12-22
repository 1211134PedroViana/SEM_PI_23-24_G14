import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import { SystemUserService } from 'src/systemUserService/systemUser.service';
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';

@Component({
  selector: 'app-pickup-delivery-tasks',
  templateUrl: './pickup-delivery-tasks.component.html',
  styleUrls: ['./pickup-delivery-tasks.component.css']
})
export class ApproveDenyPickupDeliveryTasksComponent {

  observables: Observable<any>[] = [];

  selectedStatus = 'Pending';
  isFormVisible: boolean = true;
  isListVisible: boolean = false;
  tasks: PickupAndDeliveryTask[] = [];
  parsedTasks: PickupAndDeliveryTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService,
    private floorService: FloorService, private router: Router) { }

  closeForm() {
    this.isListVisible = false;
    this.router.navigate(["/task/approveOrDenyTask"]);
  }

  ngOnInit() {
    this.loadSurvTasks();
  }

  loadSurvTasks() {
    this.taskService.getByStatusPickupAndDelivery(this.selectedStatus)
      .pipe(
        tap((response) => {
          this.tasks = response;
          this.parsePickList();
          console.log('Pickup & Delivery Tasks listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the Pickup & Delivery Tasks', error);
          throw error;
        })
      )
      .subscribe()
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
  openForm(task: PickupAndDeliveryTask) {
    // Pass task data to the form component (e.g., using a service)
    this.taskService.openForm1(task);
    this.isFormOpen = true;
  }
}
