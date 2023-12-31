import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';


@Component({
  selector: 'app-create-building-form',
  templateUrl: './create-building-form.component.html',
  styleUrls: ['./create-building-form.component.css']
})

export class CreateBuildingFormComponent {

  code: string = " ";
  name: string = " ";
  description: string = " ";

  constructor(private buildingService: BuildingService, private snackBar: MatSnackBar) { }

  closeForm() {
    this.buildingService.closeForm();
  }

  onSubmit() {
    const buildingData = ({
      code: this.code,
      name: this.name,
      description: this.description
    }) as Building;

    this.buildingService.addBuilding(buildingData)
      .pipe(
        tap((response) => {
          console.log('Building created successfully', response);
          const message = `Building created successfully! | Code: ${response.code} | Name: ${response.name} | Description: ${response.description}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Building', error);
          this.snackBar.open('Failed to create building, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }
}
