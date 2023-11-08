import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import Floor from 'src/floorService/floor';
import { FloorService } from 'src/floorService/floor-service';

@Component({
  selector: 'app-create-floor-form',
  templateUrl: './create-floor-form.component.html',
  styleUrls: ['./create-floor-form.component.css']
})
export class CreateFloorFormComponent {

  buildingId: string = " "; 
  floorNumber: number = 0; 
  description: string = " ";

  constructor(private floorService: FloorService, private snackBar: MatSnackBar) { }

  onSubmit() {
    const floorData = ({
      buildingId: this.buildingId,
      floorNumber: this.floorNumber,
      description: this.description
    }) as Floor;

    this.floorService.createFloor(floorData)
      .pipe(
        tap((response) => {
          console.log('Floor created successfully', response);
          const message = `Floor created successfully! | ID: ${response.id} | Building ID: ${response.buildingId} | Number: ${response.floorNumber} | Description: ${response.description}`;
          this.snackBar.open(message);
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Floor', error);
          this.snackBar.open('Failed to create floor, returned code:' + error.status);
          throw error;
        })
      )
      .subscribe();
  }

}