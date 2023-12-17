import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import RobotType from './robotType';
import TaskType from './taskType';
import Elevator from "../elevatorService/elevator";
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class RobotTypeService {

  private createUrl = 'api/robotTypes/create';
  private listUrl = 'api/robotTypes/list';
  private getTaskTypeUrl = 'api/taskTypes/getTaskType/';
  private getTaskTypeByIdUrl = 'api/taskTypes/getTaskTypeNById/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private robotType = new BehaviorSubject<RobotType>({} as RobotType);

  constructor(private http: HttpClient, private configService: ConfigService) { }

  createRobotType(robotType: RobotType): Observable<RobotType> {
    const httpOptions = { withCredentials: true };

    return this.http.post<RobotType>(this.configService.mdrUrl + this.createUrl, robotType, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllRobotTypes(): Observable<RobotType[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<RobotType[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  addRobotType(robotType: RobotType): Observable<RobotType> {
    const httpOptions = { withCredentials: true };

    return this.http.post<RobotType>(this.configService.mdrUrl + this.createUrl, robotType, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  closeForm() {
    this.isVisible.next(false);
  }
  getTaskType(name: string): Observable<TaskType> {
    const httpOptions = { withCredentials: true };

    return this.http.get<TaskType>(this.configService.mdrUrl + this.getTaskTypeUrl + name, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getTaskTypeById(taskTypeId: string): Observable<TaskType> {
    const httpOptions = { withCredentials: true };

    return this.http.get<TaskType>(this.configService.mdrUrl + this.getTaskTypeByIdUrl + taskTypeId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}
