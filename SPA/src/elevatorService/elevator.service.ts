import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Elevator from './elevator';

@Injectable({
  providedIn: 'root'
})

export class ElevatorService {

  private createUrl = 'http://localhost:4000/api/elevators/create';
  private updateUrl = 'http://localhost:4000/api/elevators/update';
  private listUrl = 'http://localhost:4000/api/elevators/list';

  private isVisible = new BehaviorSubject<boolean>(false);
  private elevator = new BehaviorSubject<Elevator>({} as Elevator);

  constructor(private http: HttpClient) { }

  addElevator(elevator: Elevator): Observable<Elevator> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Elevator>(this.createUrl, elevator, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateElevator(elevator: Elevator): Observable<Elevator> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Elevator>(this.updateUrl, elevator, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }


  getAllElevators(): Observable<Elevator[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Elevator[]>(this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllFloorsServedByElevator(): Observable<string[]> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<string[]>(this.listUrl, httpOptions)
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
