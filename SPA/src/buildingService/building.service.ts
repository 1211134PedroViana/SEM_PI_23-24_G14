import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Building from './building';

@Injectable({
  providedIn: 'root'
})

export class BuildingService {

  private createUrl = 'http://localhost:4000/api/buildings/create';
  private updateUrl = 'http://localhost:4000/api/buildings/update';
  private listUrl = 'http://localhost:4000/api/buildings/list';

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


}