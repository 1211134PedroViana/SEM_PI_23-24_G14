import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of   } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SurveillanceTask from './surveillanceTask';
import PickupAndDeliveryTask from './pickupAndDeliveryTask';
import { ConfigService } from '../config.service';
import Elevator from "../elevatorService/elevator";
import Task from './task';
import Tasks from './tasks';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private isVisible = new BehaviorSubject<boolean>(false);
  private survTask = new BehaviorSubject<SurveillanceTask>({} as SurveillanceTask);
  private picTask = new BehaviorSubject<PickupAndDeliveryTask>({} as PickupAndDeliveryTask);

  private createSurveillanceUrl = 'api/SurveillanceTasks';
  private createPickupAndDeliveryUrl = 'api/PickupAndDeliveryTasks';

  private searchByStatusSurveillanceUrl = 'api/SurveillanceTasks/searchByStatus/';
  private searchByStatusPickupAndDeliveryUrl = 'api/PickupAndDeliveryTasks/searchByStatus/';

  private getAllSurveillanceUrl = 'api/SurveillanceTasks';
  private getAllPickupAndDeliveryUrl = 'api/PickupAndDeliveryTasks';

  private searchByUserSurveillanceUrl = 'api/SurveillanceTasks/searchByUser/';
  private searchByUserPickupAndDeliveryUrl = 'api/PickupAndDeliveryTasks/searchByUser/';

  private approveSurveillanceTaskURrl = 'api/SurveillanceTasks/approveSurveillanceTask/';
  private denySurveillanceTaskURrl = 'api/SurveillanceTasks/denySurveillanceTask/';
  private approvePickupAndDeliveryTaskURrl = 'api/PickupAndDeliveryTasks/approvePickupAndDeliveryTask/';
  private denyPickupAndDeliveryTaskURrl = 'api/PickupAndDeliveryTasks/denyPickupAndDeliveryTask/';

  private getTasksSequenceUrl = 'tasksPath/';
  private getPickupTaskByCodeUrl = 'api/PickupAndDeliveryTasks/getByCode/';
  private getSurvTaskByCodeUrl = 'api/SurveillanceTasks/getByCode/';

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  approveSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.patch<SurveillanceTask>(this.configService.mduUrl + this.approveSurveillanceTaskURrl, surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  denySurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.patch<SurveillanceTask>(this.configService.mduUrl + this.denySurveillanceTaskURrl, surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  approvePickupAndDeliveryTask(id: string, pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };
  
    return this.http.patch<PickupAndDeliveryTask>(
      `${this.configService.mduUrl}api/PickUpAndDeliveryTasks/approve/${id}`,
      pickupAndDeliveryTask,
      httpOptions
    ).pipe(
      // catchError(this.handleError('approvePickupAndDeliveryTask', pickupAndDeliveryTask))
    );
  }
  
  denyPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.patch<PickupAndDeliveryTask>(this.configService.mduUrl + this.denyPickupAndDeliveryTaskURrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  createSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>(this.configService.mduUrl + this.createSurveillanceUrl, surveillanceTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  createPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>(this.configService.mduUrl + this.createPickupAndDeliveryUrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusSurveillanceTask(status: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.configService.mduUrl + this.searchByStatusSurveillanceUrl + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusPickupAndDelivery(status: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.configService.mduUrl + this.searchByStatusPickupAndDeliveryUrl + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllSurveillanceTask(): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.configService.mduUrl + this.getAllSurveillanceUrl, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllPickupAndDelivery(): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.configService.mduUrl + this.getAllPickupAndDeliveryUrl, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserSurveillanceTask(userId: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.configService.mduUrl + this.searchByUserSurveillanceUrl + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserPickupAndDelivery(userId: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.configService.mduUrl + this.searchByUserPickupAndDeliveryUrl + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getTasksSequence(tasks: string): Observable<Tasks> {
    const httpOptions = { withCredentials: true };
    let url = `http://localhost:5000/tasksPath?data=${tasks}`;
    return this.http.get<Tasks>(url)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByCodePickupAndDelivery(code: string): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask>(this.configService.mduUrl + this.getPickupTaskByCodeUrl + code, httpOptions)
      .pipe(
        
    );
  }

  getByCodeSurveillanceTask(code: string): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask>(this.configService.mduUrl + this.getSurvTaskByCodeUrl + code, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  openForm(task: SurveillanceTask) {
    this.survTask.next(task);
    this.isVisible.next(true);
  }

  openForm1(task: PickupAndDeliveryTask) {
    this.picTask.next(task);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getSurveillanceTask() {
    return this.survTask.asObservable();
  }

  getPickupAndDelivery() {
    return this.picTask.asObservable();
  }

}
