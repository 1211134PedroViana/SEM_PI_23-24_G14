import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SurveillanceTask from './surveillanceTask';
import PickupAndDeliveryTask from './pickupAndDeliveryTask';


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private createSurveillanceUrl = 'http://localhost:5095/api/SurveillanceTasks';
  private createPickupAndDeliveryUrl = 'http://localhost:5095/api/PickupAndDeliveryTasks';

  constructor(private http: HttpClient) {
  }

  createSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<SurveillanceTask>(this.createSurveillanceUrl, surveillanceTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  createPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<PickupAndDeliveryTask>(this.createPickupAndDeliveryUrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }
}