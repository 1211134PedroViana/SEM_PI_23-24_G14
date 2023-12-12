import { Component } from '@angular/core';

@Component({
    selector: 'app-approve-deny-task',
    templateUrl: 'approve-deny-task.component.html',
    styleUrls: ['./approve-deny-task.css']
})
export class ApproveDenyTaskComponent {

    titleText = 'Tasks';
    feature1ButtonText = 'Approve or Deny a Task';
    feature1Route = '/task/searchTask/byStatus';  
}