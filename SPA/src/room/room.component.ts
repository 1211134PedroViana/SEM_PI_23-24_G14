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
  createRoute = '/campus/room/create';
  updateRoute = '/campus/room/update';
  listRoute = '/campus/room/list';
}
