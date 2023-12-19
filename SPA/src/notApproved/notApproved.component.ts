import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './notApproved.component.html',
  styleUrls: ['./notApproved.component.css']
})
export class NotApprovedComponent {
  titleText = 'List Tasks';
  feature1ButtonText = 'Surveillance Tasks';
  feature2ButtonText = 'Pick and Delivery Task';
  feature1Route = '/task/list/surTasks';
  feature2Route = '/task/list/picTasks';
}
