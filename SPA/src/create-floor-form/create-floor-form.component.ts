import { Component } from '@angular/core';
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

  constructor(private floorService: FloorService) { }

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
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Floor', error);
          throw error;
        })
      )
      .subscribe();
  }

}
