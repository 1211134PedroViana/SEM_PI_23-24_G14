import { Component } from '@angular/core';
import { BuildingService } from '../../src/buildingService/building.service';
import { Building } from '../../src/buildingService/building';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-building-form',
  templateUrl: './create-building-form.component.html',
  styleUrls: ['./create-building-form.component.css']
})

export class CreateBuildingFormComponent {

  code: string = " "; 
  name: string = " "; 
  description: string = " ";

  constructor(private buildingService: BuildingService) { }

  onSubmit() {
    const buildingData = new Building(this.code, this.name, this.description);

    this.buildingService.addBuilding(buildingData)
      .pipe(
        tap((response) => {
          console.log('Building added successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while adding the building', error);
          throw error;
        })
      )
      .subscribe();
  }

}
