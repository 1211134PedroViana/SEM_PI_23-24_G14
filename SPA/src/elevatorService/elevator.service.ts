import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Elevator from './elevator';

@Injectable({
  providedIn: 'root'
})

export class ElevatorService {

  private createUrl = 'http://localhost:4200/api/elevator/create';
  private updateUrl = 'http://localhost:4200/api/elevator/update';
  private listUrl = 'http://localhost:4200/api/elevator/list';

  private isVisible = new BehaviorSubject<boolean>(false);
  private building = new BehaviorSubject<Elevator>({} as Elevator);

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

  openForm(elevator: Elevator) {
    this.building.next(elevator);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getBuilding() {
    return this.building.asObservable();
  }

}
