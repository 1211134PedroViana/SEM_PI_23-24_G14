import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/taskService/task.service';

@Component({
  selector: 'app-task-by-status',
  templateUrl: './task-by-status.component.html',
  styleUrls: ['./task-by-status.component.css']
})
export class TaskByStatusComponent {

  selectedStatus = '';

  constructor(private taskService: TaskService, private router: Router) { }

  closeForm() {
    this.router.navigate(["/user/searchTask"]);
  }

  onSubmit() {
    
  }

}
