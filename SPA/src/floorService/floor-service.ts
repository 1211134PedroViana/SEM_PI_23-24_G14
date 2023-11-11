import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Floor from './floor';


@Injectable({
  providedIn: 'root'
})

export class FloorService {

  private createUrl = 'http://localhost:4000/api/floors/create';
  private updateUrl = 'http://localhost:4000/api/floors/update';
  private listUrl = 'http://localhost:4000/api/floors/list';
  private listFromBuildingUrl = 'http://localhost:4000/api/floors/fromBuilding/';

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

  getFloorsFromBuilding(buildingId: string): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Floor[]>(this.listFromBuildingUrl + buildingId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}