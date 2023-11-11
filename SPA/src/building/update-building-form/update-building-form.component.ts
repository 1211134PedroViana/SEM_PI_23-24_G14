import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  selectedBuilding: any;

  constructor(private buildingService: BuildingService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.buildingService.getBuilding().subscribe((building) => {
      this.selectedBuilding = building;
    });
    console.log(this.selectedBuilding);
  }

  closeForm() {
    this.buildingService.closeForm();
  }

  onSubmit() {

    let buildingData = ({
      id: this.selectedBuilding.id,
      name: this.selectedBuilding.name,
      description: this.selectedBuilding.description
    }) as Building;

    this.buildingService.updateBuilding(buildingData)
      .pipe(
        tap((response) => {
          console.log('Building updated successfully', response);
          const message = `Building updated successfully! | ID: ${response.id} | Code: ${response.code} | Name: ${response.name} | Description: ${response.description}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while updating the building, returned code:' + error.status);
          this.snackBar.open('Failed to updated building, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

}
