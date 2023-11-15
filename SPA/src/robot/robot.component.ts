import { Component } from '@angular/core';

@Component({
    selector: 'app-building',
    templateUrl: './robot.component.html',
    styleUrls: ['./robot.component.css']
})

export class RobotComponent {
    titleText = 'Robots Management';
    createButtonText = 'Create Robot';
    updateButtonText = 'Update Robot';
    listButtonText = 'List Robots';
    createRoute = '/robot/create';
    updateRoute = '/robot/update';
    listRoute = '/robot/list';
}