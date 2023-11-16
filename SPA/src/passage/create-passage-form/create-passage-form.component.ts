import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';
import { BuildingService } from 'src/buildingService/building.service';
import Floor from 'src/floorService/floor';
import { FloorService } from 'src/floorService/floor-service';
import Passage from 'src/passageService/passage';
import { PassageService } from 'src/passageService/passage-service';

@Component({
  selector: 'app-create-passage-form',
  templateUrl: './create-passage-form.component.html',
  styleUrls: ['./create-passage-form.component.css']
})

export class CreatePassageFormComponent implements OnInit {

  buildings: Building[] = [];
  floors1: Floor[] = [];
  floors2: Floor[] = [];

  selectedFromBuilding: string = "";
  selectedFloor1: string = "";
  selectedToBuilding: string = "";
  selectedFloor2: string = "";
  positionX: number = 0;
  positionY: number = 0;
  direction: string = "";

  constructor(private passageService: PassageService, private buildingService: BuildingService,
    private floorService: FloorService, private snackBar: MatSnackBar) { }

  onSubmit() {
    console.log("id:" + this.selectedFloor1)
    const passageData = ({
      fromFloorId: this.selectedFloor1,
      toFloorId: this.selectedFloor2,
      location: {
        positionX: this.positionX,
        positionY: this.positionY,
        direction: this.direction
      }
    }) as Passage;

    this.passageService.createPassage(passageData)
      .pipe(
        tap((response) => {
          console.log('Passage created successfully', response);
          const message = `Passage created successfully! | Position X: ${response.location.positionX} | Position Y: ${response.location.positionY} | Direction: ${response.location.direction}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Passage', error);
          this.snackBar.open('Failed to create passage, returned code:' + error.status, 'Close', {
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

  onFromBuildingChange() {
    this.floors1 = [];
    this.floorService.getFloorsFromBuilding(this.selectedFromBuilding).subscribe((floors: Floor[]) => {
        this.floors1 = floors;
    });
  }

  onToBuildingChange() {
    this.floors2 = [];
    this.floorService.getFloorsFromBuilding(this.selectedToBuilding).subscribe((floors: Floor[]) => {
        this.floors2 = floors;
    });
  }

}
