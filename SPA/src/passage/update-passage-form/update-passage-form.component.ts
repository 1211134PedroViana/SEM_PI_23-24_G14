import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { PassageService } from '../../passageService/passage.service';
import { BuildingService } from 'src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';
import Floor from "../../floorService/floor";
import Passage from "../../passageService/passage";
import { FloorService } from "../../floorService/floor-service";

@Component({
  selector: 'app-update-passage-form',
  templateUrl: './update-passage-form.component.html',
  styleUrls: ['./update-passage-form.component.css']
})

export class UpdatePassageFormComponent {
  selectedPassage: any;

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
  constructor(private passageService: PassageService,private buildingService: BuildingService, private floorService: FloorService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.passageService.getPassage().subscribe((passage) => {
      this.selectedPassage = passage;
    });
    console.log(this.selectedPassage);
    this.buildingService.getAllBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
  }

  closeForm() {
    this.passageService.closeForm();
  }

  onSubmit() {
    let passageData = ({
      id: this.selectedPassage.id,
      fromBuildingId: this.selectedFromBuilding,
      toBuildingId: this.selectedToBuilding,
      fromFloorId: this.selectedFloor1,
      toFloorId: this.selectedFloor2,
      location: {
        positionX: this.positionX,
        positionY: this.positionY,
        direction: this.direction
      }
    }) as Passage;

    this.passageService.updatePassage(passageData)
      .pipe(
        tap((response) => {
          console.log('Passage updated successfully', response);
          const message = `Passage updated successfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while updating the passage, returned code:' + error.status);
          this.snackBar.open('Failed to updated passage, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
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
