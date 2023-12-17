import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Floor from './floor';
import { ConfigService } from '../config.service';


@Injectable({
  providedIn: 'root'
})

export class FloorService {

  private createUrl = 'api/floors/create';
  private updateUrl = 'api/floors/update';
  private listUrl = 'api/floors/list';
  private listFromBuildingUrl = 'api/floors/fromBuilding/';
  private listFloorsWithPassages = 'api/floors/withPassages/';
  private listFloorsWithElevator = 'api/floors/withElevator/';
  private floorByIdUrl = 'api/floors/floorById/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private floor = new BehaviorSubject<Floor>({} as Floor);

  constructor(private http: HttpClient, private configService: ConfigService) { }

  createFloor(floor: Floor): Observable<Floor> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Floor>(this.configService.mdrUrl + this.createUrl, floor, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  updateFloor(floor: Floor): Observable<Floor> {
    const httpOptions = { withCredentials: true };

    return this.http.put<Floor>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addFloor', floor))
      );
  }

  getFloorsFromBuilding(buildingId: string): Observable<Floor[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listFromBuildingUrl + buildingId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }
  getAllFloorsWithPassages(): Observable<Floor[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listFloorsWithPassages, httpOptions)
      .pipe(
      //catchError(this.handleError('addFloor', floor))
    );
  }

  getAllFloorsWithElevator(): Observable<Floor[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listFloorsWithElevator, httpOptions)
      .pipe(
      //catchError(this.handleError('addFloor', floor))
    );
  }

  getFloorById(floorId: string): Observable<Floor> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor>(this.configService.mdrUrl + this.floorByIdUrl + floorId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
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
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }


}
