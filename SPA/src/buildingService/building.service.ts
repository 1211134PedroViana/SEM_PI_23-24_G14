import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Building from './building';
import Floor from 'src/floorService/floor';

@Injectable({
  providedIn: 'root'
})

export class BuildingService {

  private createUrl = 'http://localhost:4000/api/buildings/create';
  private updateUrl = 'http://localhost:4000/api/buildings/update';
  private listUrl = 'http://localhost:4000/api/buildings/list';

  private isVisible = new BehaviorSubject<boolean>(false);
  private building = new BehaviorSubject<Building>({} as Building);

  constructor(private http: HttpClient) { }

  addBuilding(building: Building): Observable<Building> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Building>(this.createUrl, building, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateBuilding(building: Building): Observable<Building> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Building>(this.updateUrl, building, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllBuildings(): Observable<Building[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Building[]>(this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllFloors(): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.get<Floor[]>(this.listUrl, httpOptions)
    .pipe(
      //catchError(this.handleError('listFloors', floor))
    );
  }

  openForm(building: Building) {
    this.building.next(building);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getBuilding() {
    return this.building.asObservable();
  }

}