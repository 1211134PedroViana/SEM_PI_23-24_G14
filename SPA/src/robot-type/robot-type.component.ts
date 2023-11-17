import { Component } from '@angular/core';

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.css']
})

export class RobotTypeComponent {

  titleText = 'Robot Types Management';
  createButtonText = 'Create RobotType';
  createRoute = '/fleet/robotType/create';
}
