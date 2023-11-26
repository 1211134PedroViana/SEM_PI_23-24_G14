import { Component } from '@angular/core';

@Component({
    selector: 'app-robot',
    templateUrl: './robot.component.html',
    styleUrls: ['./robot.component.css']
})

export class RobotComponent {
    titleText = 'Robots Management';
    feature1ButtonText = 'Create Robot';
    feature2ButtonText = 'List Robots';
    feature3ButtonText = 'Deactivate Robot';
    feature4ButtonText = 'Search Robot';
    feature1Route = '/fleet/robot/create';
    feature2Route = '/fleet/robot/list';
    feature3Route = '/fleet/robot/deactivate';
    feature4Route = '/fleet/robot/retrieve';
}
