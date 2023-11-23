import { Component } from '@angular/core';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})

export class FloorComponent {

  titleText = 'Floors Management';
  feature1ButtonText = 'Create Floor';
  feature2ButtonText = 'Update Floor';
  feature3ButtonText = 'List Floors';
  feature4ButtonText = 'Load Map';
  feature5ButtonText = 'List Floors With Elevator';
  feature6ButtonText = 'List Floors With Passages';
  feature1Route = '/campus/floor/create';
  feature2Route = '/campus/floor/update';
  feature3Route = '/campus/floor/list';
  feature4Route = '/campus/floor/loadMap';
  feature5Route = '/campus/floor/listFloorsWithElevator';
  feature6Route = '/campus/floor/listFloorsWithPassages';
}
