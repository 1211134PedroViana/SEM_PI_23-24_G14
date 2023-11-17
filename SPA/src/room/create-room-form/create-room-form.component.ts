import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {RoomService} from "../../roomService/room.service";
import Room from "../../roomService/room";

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.css']
})
export class CreateRoomFormComponent {

  code: string = "";
  name: string = "";
  description: string = "";
  pos1: number = 0;
  pos2: number = 0;
  pos3: number = 0;
  pos4: number = 0;
  positionX: number = 0;
  positionY: number = 0;
  direction: string = "";
  floorId: string = "";

  constructor(private roomService: RoomService, private snackBar: MatSnackBar) { }

  closeForm() {
    this.roomService.closeForm();
  }

  onSubmit() {
    const roomData = {
      code: this.code,
      name: this.name,
      description: this.description,
      dimension: {
        pos1: this.pos1,
        pos2: this.pos2,
        pos3: this.pos3,
        pos4: this.pos4
      },
      location: {
        positionX: this.positionX,
        positionY: this.positionY,
        direction: this.direction
      },
      floorId: this.floorId
    } as Room;

    this.roomService.addRoom(roomData)
      .pipe(
        tap((response) => {
          console.log('Room created successfully', response);
          const message = `Room created successfully! | Code: ${response.code} | Dimension: ${response.dimension} | Description: ${response.description} | Name: ${response.name} | Floor Id: ${response.floorId} | Location: ${response.location}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Room', error);
          this.snackBar.open(`Failed to create room, returned code: ${error.status}`, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }
}

