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
  feature5ButtonText = 'List Floors With Passages';
  feature6ButtonText = 'put button text here';
  feature1Route = '/campus/floor/create';
  feature2Route = '/campus/floor/update';
  feature3Route = '/campus/floor/list';
  feature4Route = '/campus/floor/loadMap';
  feature5Route = '/campus/floor/listFloorsWithPassages';
  feature6Route = '/campus/floor/put router here';
}
