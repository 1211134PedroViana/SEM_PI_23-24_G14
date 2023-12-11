import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Passage from "../../passageService/passage";
import {PassageService} from "../../passageService/passage.service";
import Building from "../../buildingService/building";
import Floor from "../../floorService/floor";


@Component({
  selector: 'app-list-passage',
  templateUrl: './list-passage.component.html',
  styleUrls: ['./list-passage.component.css']
})
export class ListPassageComponent implements OnInit {

  passages: Passage[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];

  selectedPassage: any;

  constructor(private passageService: PassageService) { }

  ngOnInit(): void {
    this.loadBuildings();
    this.loadFloors();

    this.loadPassages();
  }

  loadPassages() {
    this.passageService.getAllPassages()
      .pipe(
        tap((response) => {
          this.passages = response;
          console.log('Passages listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the passages', error);
          throw error;
        })
      )
      .subscribe()
  }

  loadBuildings() {
    this.passageService.getBuildings()
      .pipe(
        tap((response) => {
          this.buildings = response;
          console.log('Buildings listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the passages', error);
          throw error;
        })
      )
      .subscribe()
  }

  loadFloors() {
    this.passageService.getFloors()
      .pipe(
        tap((response) => {
          this.floors = response;
          console.log('Floors listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the passages', error);
          throw error;
        })
      )
      .subscribe()
  }

  isFormOpen = false;
  openForm(passage: Passage) {
    // Pass building data to the form component (e.g., using a service)
    this.passageService.openForm(passage);
    this.isFormOpen = true;
  }

  findBuildingCode(buildingId: string): string | undefined {
    const foundBuilding = this.buildings.find(building => buildingId.match(buildingId));
    return foundBuilding ? foundBuilding.code : undefined;
  }

  findFloorNumber(floorId: string): number | undefined {
    const foundFloor = this.floors.find(floor => floor.id === floorId);
    return foundFloor ? foundFloor.floorNumber : undefined;
  }
}
