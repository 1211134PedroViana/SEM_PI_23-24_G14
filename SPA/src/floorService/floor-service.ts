import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Floor from './floor';
import Building from "../buildingService/building";


@Injectable({
  providedIn: 'root'
})

export class FloorService {

  private createUrl = 'http://localhost:4000/api/floors/create';
  private updateUrl = 'http://localhost:4000/api/floors/update';
  private listUrl = 'http://localhost:4000/api/floors/list';
  private listFromBuildingUrl = 'http://localhost:4000/api/floors/fromBuilding/';
  private listFloorsWithPassages = 'http://localhost:4000/api/floors/withPassages/';
  private listFloorsWithElevator = 'http://localhost:4000/api/floors/withElevator/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private floor = new BehaviorSubject<Floor>({} as Floor);

  constructor(private http: HttpClient) { }

  createFloor(floor: Floor): Observable<Floor> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Floor>(this.createUrl, floor, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  updateFloor(floor: Floor): Observable<Floor> {
    const httpsOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.put<Floor>(this.listUrl, httpsOptions)
      .pipe(
        //catchError(this.handleError('addFloor', floor))
      );
  }

  getFloorsFromBuilding(buildingId: string): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Floor[]>(this.listFromBuildingUrl + buildingId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }
  getAllFloorsWithPassages(): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Floor[]>(this.listFloorsWithPassages, httpOptions)
      .pipe(
      //catchError(this.handleError('addFloor', floor))
    );
  }

  getAllFloorsWithElevator(): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Floor[]>(this.listFloorsWithElevator, httpOptions)
      .pipe(
      //catchError(this.handleError('addFloor', floor))
    );
  }

  openForm(floor: Floor) {
    this.floor.next(floor);
    this.isVisible.next(true);
  }
  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getFloor() {
    return this.floor.asObservable();
  }

  closeForm() {
    this.isVisible.next(false);
  }
  getAllFloors(): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<Floor[]>(this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }


}
