import { Component } from '@angular/core';

@Component({
    selector: 'app-approve-deny-task',
    templateUrl: 'approve-deny-task.component.html',
    styleUrls: ['./approve-deny-task.css']
})
export class ApproveDenyTaskComponent {

    titleText = 'Approve or Deny a Task';
    feature1ButtonText = 'Approve a Task';
    feature2ButtonText = 'Deny a Task';
    feature1Route = '/task/approveOrDenyTask/approveTask';  
    feature2Route = '/task/approveOrDenyTask/denyTask';  
}