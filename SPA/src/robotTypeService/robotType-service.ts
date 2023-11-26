import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import RobotType from './robotType';
import TaskType from './taskType';
import Elevator from "../elevatorService/elevator";

@Injectable({
  providedIn: 'root'
})

export class RobotTypeService {

  private createUrl = 'http://localhost:4000/api/robotTypes/create';
  private getTaskTypeUrl = 'http://localhost:4000/api/taskTypes/getTaskType/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private robotType = new BehaviorSubject<RobotType>({} as RobotType);

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

  addRobotType(robotType: RobotType): Observable<RobotType> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<RobotType>(this.createUrl, robotType, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  closeForm() {
    this.isVisible.next(false);
  }
  getTaskType(name: string): Observable<TaskType> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<TaskType>(this.getTaskTypeUrl + name, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}
