import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Elevator from './elevator';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class ElevatorService {

  private createUrl = 'api/elevators/create';
  private updateUrl = 'api/elevators/update';
  private listUrl = 'api/elevators/list';
  private buildingElevatorUrl = 'api/elevators/elevatorFromBuilding/';
  private elevByDescriptionUrl = 'api/elevators/elevatorFromDescription/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private elevator = new BehaviorSubject<Elevator>({} as Elevator);

  constructor(private http: HttpClient, private configService: ConfigService) { }

  addElevator(elevator: Elevator): Observable<Elevator> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Elevator>(this.configService.mdrUrl + this.createUrl, elevator, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateElevator(elevator: Elevator): Observable<Elevator> {
    const httpOptions = { withCredentials: true };

    return this.http.put<Elevator>(this.configService.mdrUrl + this.updateUrl, elevator, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }


  getAllElevators(): Observable<Elevator[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Elevator[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllFloorsServedByElevator(): Observable<string[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<string[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getElevatorByBuilding(buildingId: string): Observable<Elevator> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Elevator>(this.configService.mdrUrl + this.buildingElevatorUrl + buildingId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getElevatorByDescription(description: string): Observable<Elevator> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Elevator>(this.configService.mdrUrl + this.elevByDescriptionUrl + description, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  openForm(elevator: Elevator) {
    this.elevator.next(elevator);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getElevator() {
    return this.elevator.asObservable();
  }

}
