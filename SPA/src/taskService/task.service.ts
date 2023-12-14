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

  private searchByStatusSurveillanceUrl = 'http://localhost:5095/api/SurveillanceTasks/searchByStatus/';
  private searchByStatusPickupAndDeliveryUrl = 'http://localhost:5095/api/PickupAndDeliveryTasks/searchByStatus/';

  private getAllSurveillanceUrl = 'http://localhost:5095/api/SurveillanceTasks';
  private getAllPickupAndDeliveryUrl = 'http://localhost:5095/api/PickupAndDeliveryTasks';

  private searchByUserSurveillanceUrl = 'http://localhost:5095/api/SurveillanceTasks/searchByUser/';
  private searchByUserPickupAndDeliveryUrl = 'http://localhost:5095/api/PickupAndDeliveryTasks/searchByUser/';

  private approveSurveillanceTaskURrl = 'http://localhost:5095/api/SurveillanceTasks/approveSurveillanceTask/';
  private denySurveillanceTaskURrl = 'http://localhost:5095/api/SurveillanceTasks/denySurveillanceTask/';
  private approvePickupAndDeliveryTaskURrl = 'http://localhost:5095/api/PickupAndDeliveryTasks/approvePickupAndDeliveryTask/';
  private denyPickupAndDeliveryTaskURrl = 'http://localhost:5095/api/PickupAndDeliveryTasks/denyPickupAndDeliveryTask/';

  constructor(private http: HttpClient) {
  }
  
  approveSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>(this.approveSurveillanceTaskURrl, surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  denySurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>(this.denySurveillanceTaskURrl, surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  approvePickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>(this.approvePickupAndDeliveryTaskURrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  denyPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>(this.denyPickupAndDeliveryTaskURrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  createSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>(this.createSurveillanceUrl, surveillanceTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  createPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>(this.createPickupAndDeliveryUrl, pickupAndDeliveryTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusSurveillanceTask(status: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.searchByStatusSurveillanceUrl + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusPickupAndDelivery(status: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.searchByStatusPickupAndDeliveryUrl + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllSurveillanceTask(): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.getAllSurveillanceUrl, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllPickupAndDelivery(): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.getAllPickupAndDeliveryUrl, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserSurveillanceTask(userId: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>(this.searchByUserSurveillanceUrl + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserPickupAndDelivery(userId: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>(this.searchByUserPickupAndDeliveryUrl + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }


}