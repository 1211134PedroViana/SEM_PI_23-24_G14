import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';

@Component({
  selector: 'app-update-building-form',
  templateUrl: './update-building-form.component.html',
  styleUrls: ['./update-building-form.component.css']
})

export class UpdateBuildingFormComponent {

  id: string = " "; 
  name: string = " "; 
  description: string = " ";

  constructor(private buildingService: BuildingService, private snackBar: MatSnackBar) { }

  onSubmit() {
    let buildingData: Building;

    if(this.name === " ") {
      buildingData = ({
        id: this.id,
        description: this.description
      }) as Building;

    }else if( this.description === " ") {
      buildingData = ({
        id: this.id,
        name: this.name
      }) as Building;
    }else {
      buildingData = ({
        id: this.id,
        name: this.name,
        description: this.description
      }) as Building;
    }

    this.buildingService.updateBuilding(buildingData)
      .pipe(
        tap((response) => {
          console.log('Building updated successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while updating the building', error);
          throw error;
        })
      )
      .subscribe();
  }

}
