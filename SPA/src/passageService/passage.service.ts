import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import Passage from './passage';
import Elevator from "../elevatorService/elevator";
import Building from "../buildingService/building";
import Floor from "../floorService/floor";


@Injectable({
  providedIn: 'root'
})

export class PassageService {

  private createUrl = 'http://localhost:4000/api/passages/create';
  private updateUrl = 'http://localhost:4000/api/passages/update';
  private listPassagesUrl = 'http://localhost:4000/api/passages/list';
  private listBuildingsUrl = 'http://localhost:4000/api/buildings/list';
  private listFloorsUrl = 'http://localhost:4000/api/floors/list';
  private floorPassagesUrl = 'http://localhost:4000/api/passages/passagesFromFloor/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private passage = new BehaviorSubject<Passage>({} as Passage);

  constructor(private http: HttpClient) { }

  createPassage(passage: Passage): Observable<Passage> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Passage>(this.createUrl, passage, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
  updatePassage(passage: Passage): Observable<Passage> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Passage>(this.updateUrl, passage, httpOptions)
      .pipe(
        //catchError(this.handleError('addPassage', passage))
      );
  }

  getBuildings(): Observable<Building[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Building[]>(this.listBuildingsUrl, httpOptions)
        .pipe(
            //catchError(this.handleError('addBuilding', building))
        );
  }

  getFloors(): Observable<Floor[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Floor[]>(this.listFloorsUrl, httpOptions)
        .pipe(
            //catchError(this.handleError('addBuilding', building))
        );
  }

  getAllPassages(): Observable<Passage[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Passage[]>(this.listPassagesUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getPassagesByFloor(floorId: string): Observable<Passage[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Passage[]>(this.floorPassagesUrl + floorId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  openForm(passage: Passage) {
    this.passage.next(passage);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

  getPassage() {
    return this.passage.asObservable();
  }
}
