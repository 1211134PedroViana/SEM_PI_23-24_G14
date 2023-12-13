import { Component } from '@angular/core';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

    titleText = 'Tasks'
    feature1ButtonText = 'Approve or Deny a Task';
    feature1Route = '/tasks/approveDenyTask';
}