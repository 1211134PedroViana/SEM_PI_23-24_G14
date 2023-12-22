import { Component, Input, Output, EventEmitter } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-surveillance-task-form',
  templateUrl: './surveillance-task-form.component.html',
  styleUrls: ['./surveillance-task-form.component.css']
})
export class ApproveDenySurveillanceTaskFormComponent {
  @Input() task: any; // Propriedade de entrada para receber a tarefa selecionada
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();

  successMessage: string = ''; // Variável para armazenar a mensagem de sucesso
  selectedTask: any;
  selectedStatus: string = ''; 

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService,
    private floorService: FloorService, private router: Router) { }

  ngOnInit() {
    /*this.taskService.getTask().subscribe((task) => {
      this.selectedTask = task;
    });
    console.log(this.selectedTask);*/
  }

  onSubmit() {
    this.updateTaskStatus();
  }

  updateTaskStatus() {
    if (this.selectedStatus === 'Approved') {
      this.taskService.approveSurveillanceTask(this.task);
      this.successMessage = 'Task successfully approved!';
    } else if (this.selectedStatus === 'Deny') {
      this.taskService.denySurveillanceTask(this.task);
      this.successMessage = 'Task successfully dennied!';
    } else {
      this.successMessage = 'Impossible to update task!';
    }
    this.formSubmit.emit();
  }
}
