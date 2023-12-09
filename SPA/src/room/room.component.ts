import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent {

  titleText = 'Rooms Management';
  feature1ButtonText = 'Create Rooms';
  feature2ButtonText = 'Update Rooms';
  feature3ButtonText = 'List Rooms';
  feature1Route = '/campus/room/create';
  feature2Route = '/campus/room/update';
  feature3Route = '/campus/room/list';
}
