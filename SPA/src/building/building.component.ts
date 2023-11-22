import { Component } from '@angular/core';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent {

  titleText = 'Buildings Management';
  feature1ButtonText = 'Create Building';
  feature2ButtonText = 'Update Building';
  feature3ButtonText = 'List Buildings';
  feature4ButtonText = 'List Buildings with Min and Max Floors';
  feature1Route = '/campus/building/create';
  feature2Route = '/campus/building/update';
  feature3Route = '/campus/building/list';
  feature4Route = '/campus/building/listBuildingsWithMinAndMaxFloors';
}
