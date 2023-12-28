import { Component} from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TaskService } from 'src/taskService/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-surveillance-tasks-form',
  templateUrl: './surveillance-tasks-form.component.html',
  styleUrls: ['./surveillance-tasks-form.component.css']
})
export class ApproveDenySurveillanceTaskFormComponent {
  selectedTask: any;
  selectedStatus: string = '';

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.taskService.getSurveillanceTask().subscribe((task) => {
      this.selectedTask = task;
    });
    console.log(this.selectedTask);
  }

  closeForm() {
    this.taskService.closeForm();
  }

  onSubmit() {
    if (this.selectedStatus === 'Approved') {
      this.taskService.approveSurveillanceTask(this.selectedTask)
        .pipe(
          tap((response) => {
            console.log('Surveillance task approved sucessfully!', response);
            const message = `Surveillance task approved sucessfully!`;
            this.snackBar.open(message, 'Close', {
              duration: 5000, // 5 seconds
            });
          }),
          catchError((error) => {
            console.error('Error occurred while approved Surveillance task', error);
            this.snackBar.open('Failed to approved Surveillance task, returned code:' + error.status, 'Close', {
              duration: 5000, // 5 seconds
            });
            throw error;
          }))
        .subscribe();
      console.log(this.selectedTask);

    } else if (this.selectedStatus === 'Refused') {
      this.taskService.denySurveillanceTask(this.selectedTask).pipe(
        tap((response) => {
          console.log('Surveillance task dennied sucessfully!', response);
          const message = `Surveillance task dennied sucessfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while dennied Surveillance task', error);
          this.snackBar.open('Failed to dennied Surveillance task, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        }))
        .subscribe();
      console.log(this.selectedTask);
    }
  }
}

 