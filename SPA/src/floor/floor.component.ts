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
  createRoute = '/floor/create';
  updateRoute = '/floor/update';
  listRoute = '/floor/list';
}
