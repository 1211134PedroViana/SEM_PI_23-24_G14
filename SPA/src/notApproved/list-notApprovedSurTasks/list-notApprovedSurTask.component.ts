import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import SurveillanceTask from "../../taskService/surveillanceTask";
import {TaskService} from "../../taskService/task.service";


@Component({
  selector: 'app-list-elevators',
  templateUrl: './list-notApprovedSurTask.component.html',
  styleUrls: ['./list-notApprovedSurTasks.component.css']
})
export class ListNotApprovedSurTaskComponent implements OnInit {

  tasks: SurveillanceTask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.loadTasksByStatus("Pending");
    this.loadTasksByStatus("Reject");
  }

  loadTasksByStatus(status: string) {
    this.taskService.getByStatusSurveillanceTask(status)
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
}
