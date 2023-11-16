import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';
import { BuildingService } from 'src/buildingService/building.service';
import Floor from 'src/floorService/floor';
import { FloorService } from 'src/floorService/floor-service';

@Component({
  selector: 'app-create-floor-form',
  templateUrl: './create-floor-form.component.html',
  styleUrls: ['./create-floor-form.component.css']
})
export class CreateFloorFormComponent {

  buildings: Building[] = [];

  buildingId: string = "";
  floorNumber: number = 0;
  description: string = "";

  constructor(private floorService: FloorService, private buildingService: BuildingService, private snackBar: MatSnackBar) { }

  onSubmit() {
    console.log("id:" + this.buildingId);
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
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Floor', error);
          this.snackBar.open('Failed to create floor, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.buildingService.getAllBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
  }

}
