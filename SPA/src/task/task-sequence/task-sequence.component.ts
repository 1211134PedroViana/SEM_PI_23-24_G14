import { Component } from '@angular/core';
import { concatMap, catchError, tap } from 'rxjs/operators';
import { of, map, from  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/taskService/task.service';
import Task from 'src/taskService/task';
import TaskSequence from 'src/taskService/taskSequence';
import { PathService } from 'src/pathService/path.service';
import Cell from 'src/pathService/cell';

@Component({
  selector: 'app-task-sequence',
  templateUrl: './task-sequence.component.html',
  styleUrl: './task-sequence.component.css'
})

export class TaskSequenceComponent {

  approvedTasks: Task[] = [];
  sequenceTasks: TaskSequence[] = [];
  isListVisible: boolean = false;
  selectedTask: any;

  path: string[] = [];
  cellsPath: Cell[][] = [];

  isTasksVisible: boolean = true;
  isViewerVisible: boolean = false;
  isFormVisible: boolean = false;

  constructor(private taskService: TaskService, private pathService: PathService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.taskService.getByStatusSurveillanceTask("Approved").subscribe((survTasks) => {
      for(let i = 0; i < survTasks.length; i++) {
        let task = ({
          code: survTasks[i].code,
          startPlace: survTasks[i].startPlace,
          endPlace: survTasks[i].endPlace
        }) as Task;
        this.approvedTasks.push(task);
      }

      this.taskService.getByStatusPickupAndDelivery("Approved").subscribe((pickupTasks) => {
        for(let i = 0; i < pickupTasks.length; i++) {
          let task = ({
            code: pickupTasks[i].code,
            startPlace: pickupTasks[i].pickupPlace,
            endPlace: pickupTasks[i].deliveryPlace
          }) as Task;
          this.approvedTasks.push(task);
        }

        console.log("tasks:" + JSON.stringify(this.approvedTasks));
        
        this.taskService.getTasksSequence(JSON.stringify(this.approvedTasks)).pipe(
          concatMap((tasks) => from(tasks.sequence)),
          concatMap((currentTask) => {
            return this.taskService.getByCodePickupAndDelivery(currentTask).pipe(
              map((pickupDeliveryTask) => ({      
                code: pickupDeliveryTask.code,
                type: "PickUp & Delivery",
                startPlace: pickupDeliveryTask.pickupPlace,
                endPlace: pickupDeliveryTask.deliveryPlace
              })),
              catchError(() => {
                return this.taskService.getByCodeSurveillanceTask(currentTask).pipe(
                  map((surveillanceTask) => ({
                    code: surveillanceTask.code,
                    type: "Surveillance",
                    startPlace: surveillanceTask.startPlace,
                    endPlace: surveillanceTask.endPlace
                  })),
                );
              })
            );
          })
        ).subscribe((result) => {
          this.sequenceTasks.push(result);
        });
      });
    });
    this.isListVisible = true;
  }

  onSubmit() {
    this.isTasksVisible = false;
    this.pathService.computePath(this.selectedTask.startPlace, this.selectedTask.endPlace)
      .pipe(
        tap((response) => {
          console.log('Path found sucessfully!', response);
          const message = `Path found successfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });

          this.path = response.caminho;
          this.cellsPath = response.movimentos;

          this.isFormVisible = false;
          this.isViewerVisible = true;

        }),
        catchError((error) => {
          console.error('Error occurred while find the Path', error);
          this.snackBar.open('Failed to find Path, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  closeForm() {
    this.isFormVisible = false;
  }

  openForm(task: Task) {
    this.selectedTask = task;
    this.isFormVisible = true;
  }
}
