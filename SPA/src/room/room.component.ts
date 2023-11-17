import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent {

  titleText = 'Rooms Management';
  createButtonText = 'Create Rooms';
  updateButtonText = 'Update Rooms';
  listButtonText = 'List Rooms';
  createRoute = '/room/create';
  updateRoute = '/room/update';
  listRoute = '/room/list';
}
