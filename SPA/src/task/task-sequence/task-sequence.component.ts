import { Component } from '@angular/core';
import { TaskService } from 'src/taskService/task.service';
import Task from 'src/taskService/task';

@Component({
  selector: 'app-task-sequence',
  templateUrl: './task-sequence.component.html',
  styleUrl: './task-sequence.component.css'
})

export class TaskSequenceComponent {

  approvedTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getByStatusSurveillanceTask("Approved").subscribe((survTasks) => {
      for(let i = 0; i < survTasks.length; i++) {
        let task = ({
          taskId: survTasks[i].buildingId,
          startPlace: survTasks[i].startPlace,
          endPlace: survTasks[i].endPlace
        }) as Task;
        this.approvedTasks.push(task);
      }

      this.taskService.getByStatusPickupAndDelivery("Approved").subscribe((pickupTasks) => {
        for(let i = 0; i < pickupTasks.length; i++) {
          let task = ({
            taskId: pickupTasks[i].userId,
            startPlace: pickupTasks[i].pickupPlace,
            endPlace: pickupTasks[i].deliveryPlace
          }) as Task;
          this.approvedTasks.push(task);
        }
      });
    });
  }
}
