import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../src/buildingService/building.service';
import { catchError, tap } from 'rxjs/operators';
import Building from 'src/buildingService/building';


@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent implements OnInit {

  buildings: Building[] = [];

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.loadBuildings();
  }

  loadBuildings() {
    this.buildingService.getAllBuildings()
      .pipe(
        tap((response) => {
          this.buildings = response;
          console.log('Buildings listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the buildings', error);
          throw error;
        })
      )
      .subscribe()
  }
}
