import { Component } from '@angular/core';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})

export class ElevatorComponent {

  titleText = 'Elevators Management';
  feature1ButtonText = 'Create Elevators';
  feature2ButtonText = 'Update Elevators';
  feature3ButtonText = 'List Elevators';
  feature1Route = '/campus/elevator/create';
  feature2Route = '/campus/elevator/update';
  feature3Route = '/campus/elevator/list';

}
