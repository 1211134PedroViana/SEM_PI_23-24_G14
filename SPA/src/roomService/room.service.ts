import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Room from './room';

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  private createUrl = 'http://localhost:4000/api/rooms/create';
  private updateUrl = 'http://localhost:4000/api/rooms/update';
  private listUrl = 'http://localhost:4000/api/rooms/list';
  private floorRoomsUrl = 'http://localhost:4000/api/rooms/roomsFromFloor/';
  private roomByDescriptionUrl = 'http://localhost:4000/api/rooms/roomFromDescription/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private elevator = new BehaviorSubject<Room>({} as Room);

  constructor(private http: HttpClient) { }

  addRoom(room: Room): Observable<Room> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Room>(this.createUrl, room, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateRoom(room: Room): Observable<Room> {
    const httpOptions = { withCredentials: true };

    return this.http.put<Room>(this.updateUrl, room, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllRoom(): Observable<Room[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Room[]>(this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getRoomsByFloor(floorId: string): Observable<Room[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Room[]>(this.floorRoomsUrl + floorId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getRoomByDescription(description: string): Observable<Room> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Room>(this.roomByDescriptionUrl + description, httpOptions)
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
