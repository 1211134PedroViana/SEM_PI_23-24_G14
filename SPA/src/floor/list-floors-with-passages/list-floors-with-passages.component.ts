import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../floorService/floor-service';
import { catchError, tap } from 'rxjs/operators';
import Floor from '../../floorService/floor';


@Component({
  selector: 'app-list-floors-with-passages',
  templateUrl: './list-floors-with-passages.component.html',
  styleUrls: ['./list-floors-with-passages.component.css']
})
export class ListFloorsWithPassagesComponent implements OnInit {

  floors: Floor[] = [];

  selectedFloor: any;

  constructor(private floorService: FloorService) { }

  ngOnInit(): void {
    this.loadFloors();
  }

  loadFloors() {
    this.floorService.getAllFloorsWithPassages()
      .pipe(
        tap((response) => {
          this.floors = response;
          console.log('Floors with passages listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the floors with passages', error);
          throw error;
        })
      )
      .subscribe()
  }

  isFormOpen = false;
  openForm(floor: Floor) {
    // Pass floor data to the form component (e.g., using a service)
    this.floorService.openForm(floor);
    this.isFormOpen = true;
  }
}
