import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import RobotType from './robotType';

@Injectable({
  providedIn: 'root'
})

export class RobotTypeService {

  private createUrl = 'http://localhost:4000/api/robotTypes/create';

  constructor(private http: HttpClient) { }

  createRobotType(robotType: RobotType): Observable<RobotType> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<RobotType>(this.createUrl, robotType, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}