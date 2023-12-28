import { Component} from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TaskService } from 'src/taskService/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pickup-delivery-tasks-form',
  templateUrl: './pickup-delivery-tasks-form.component.html',
  styleUrls: ['./pickup-delivery-tasks-form.component.css']
})
export class ApproveDenyPickupDeliveryTaskFormComponent {

  selectedTask: any;
  selectedStatus: string = ''; 

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.taskService.getPickupAndDelivery().subscribe((task) => {
      this.selectedTask = task;
    });
    console.log(this.selectedTask);
  }

  closeForm() {
    this.taskService.closeForm();
  }

  onSubmit() {
    if (this.selectedStatus === 'Approved') {
      this.taskService.approvePickupAndDeliveryTask(this.selectedTask)
        .pipe(
          tap((response) => {
            console.log('Pick Up and Delivery task approved sucessfully!', response);
            const message = `Pick Up and Delivery task approved sucessfully!`;
            this.snackBar.open(message, 'Close', {
              duration: 5000, // 5 seconds
            });
          }),
          catchError((error) => {
            console.error('Error occurred while approved Pick Up and Delivery task', error);
            this.snackBar.open('Failed to approved Pick Up and Delivery task, returned code:' + error.status, 'Close', {
              duration: 5000, // 5 seconds
            });
            throw error;
          }))
        .subscribe();
      console.log(this.selectedTask);

    } else if (this.selectedStatus === 'Refused') {
      this.taskService.denyPickupAndDeliveryTask(this.selectedTask).pipe(
        tap((response) => {
          console.log('Pick Up and Delivery task dennied sucessfully!', response);
          const message = `Pick Up and Delivery task dennied sucessfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while dennied PickUpDelivery task', error);
          this.snackBar.open('Failed to dennied PickUpDelivery task, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        }))
        .subscribe();
      console.log(this.selectedTask);
    }
  }
}
