import { Component } from '@angular/core';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})

export class FloorComponent {

  titleText = 'Floors Management';
  createButtonText = 'Create Floor';
  updateButtonText = 'Update Floor';
  listButtonText = 'List Floors';
  extraButtonText = 'Load Map';
  createRoute = '/campus/floor/create';
  updateRoute = '/campus/floor/update';
  listRoute = '/campus/floor/list';
  extraRoute = '/campus/floor/loadMap';
}
