import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Room from './room';

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  private createUrl = 'http://localhost:4200/api/room/create';
  private updateUrl = 'http://localhost:4200/api/room/update';
  private listUrl = 'http://localhost:4200/api/room/list';

  private isVisible = new BehaviorSubject<boolean>(false);
  private elevator = new BehaviorSubject<Room>({} as Room);

  constructor(private http: HttpClient) { }

  addRoom(room: Room): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Room>(this.createUrl, room, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateRoom(room: Room): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Room>(this.updateUrl, room, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllRoom(): Observable<Room[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Room[]>(this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  openForm(room: Room) {
    this.elevator.next(room);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

}