import { Component } from '@angular/core';
import { TaskService } from 'src/taskService/task.service';
import Task from 'src/taskService/task';
import TaskSequence from 'src/taskService/taskSequence';

@Component({
  selector: 'app-task-sequence',
  templateUrl: './task-sequence.component.html',
  styleUrl: './task-sequence.component.css'
})

export class TaskSequenceComponent {

  approvedTasks: Task[] = [];
  sequenceTasks: TaskSequence[] = [];
  isListVisible: boolean = false;

  constructor(private taskService: TaskService) { }

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
        
        this.taskService.getTasksSequence(JSON.stringify(this.approvedTasks)).subscribe((tasks) => {
          for(let i = 0; i < tasks.sequence.length; i++) {
            this.taskService.getByCodePickupAndDelivery(tasks.sequence[i]).subscribe((task) => {
              if(task === null) {
                this.taskService.getByCodeSurveillanceTask(tasks.sequence[i]).subscribe((task) => {
                  let temp = ({
                    code: task.code,
                    type: "Surveillance",
                    startPlace: task.startPlace,
                    endPlace: task.endPlace
                  }) as TaskSequence;
                  this.sequenceTasks.push(temp);
                });
                
              }else{
                let temp = ({
                  code: task.code,
                  type: "PickUp & Delivery",
                  startPlace: task.pickupPlace,
                  endPlace: task.deliveryPlace
                }) as TaskSequence;
                this.sequenceTasks.push(temp);
              }
            });
          }
        });
      });
    });
    this.isListVisible = true;
  }
}
