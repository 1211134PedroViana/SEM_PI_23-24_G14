import { Component } from '@angular/core';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent {

  titleText = 'Buildings Management';
  createButtonText = 'Create Building';
  updateButtonText = 'Update Building';
  listButtonText = 'List Buildings';
  createRoute = '/campus/building/create';
  updateRoute = '/campus/building/update';
  listRoute = '/campus/building/list';
}
