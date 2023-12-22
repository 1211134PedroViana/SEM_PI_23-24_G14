import { Component } from '@angular/core';

@Component({
    selector: 'app-approve-deny-task',
    templateUrl: 'approve-deny-task.component.html',
    styleUrls: ['./approve-deny-task.component.css']
})
export class ApproveDenyTaskComponent {

    titleText = 'Approve or Deny a Task';
    //feature1ButtonText = 'Approve a Task';
    //feature2ButtonText = 'Deny a Task';
    feature1ButtonText = 'Surveillance Tasks';
    feature2ButtonText = 'Pickup & Delivery Tasks';
    //feature1Route = '/task/approveOrDenyTask/approveTask';  
    //feature2Route = '/task/approveOrDenyTask/denyTask';
    feature1Route = '/task/approveOrDenyTask/surveillanceTasks';
    feature2Route = '/task/approveOrDenyTask/pickupDeliveryTasks'; 
}