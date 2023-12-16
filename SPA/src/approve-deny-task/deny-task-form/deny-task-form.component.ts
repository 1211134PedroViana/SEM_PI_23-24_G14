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
  selector: 'app-deny-task-form',
  templateUrl: './deny-task-form.component.html',
  styleUrls: ['./deny-task-form.component.css']
})
export class DenyTaskFormComponent {
  @Input() task: any; // Propriedade de entrada para receber a tarefa selecionada
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();
  successMessage: string = ''; // Variável para armazenar a mensagem de sucesso

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService,
    private floorService: FloorService, private router: Router) { }

  onSubmit() {
    this.updateTaskStatus();
  }

  updateTaskStatus() {
    this.taskService.denyPickupAndDeliveryTask(this.task);
    this.taskService.denySurveillanceTask(this.task);

    this.successMessage = 'Task successfully denied!';
    
    this.formSubmit.emit();
  }
}
