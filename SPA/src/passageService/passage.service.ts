import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import Passage from './passage';
import Elevator from "../elevatorService/elevator";
import Building from "../buildingService/building";
import Floor from "../floorService/floor";
import { ConfigService } from '../config.service';


@Injectable({
  providedIn: 'root'
})

export class PassageService {

  private createUrl = 'api/passages/create';
  private updateUrl = 'api/passages/update';
  private listPassagesUrl = 'api/passages/list';
  private listBuildingsUrl = 'api/buildings/list';
  private listFloorsUrl = 'api/floors/list';
  private floorPassagesUrl = 'api/passages/passagesFromFloor/';
  private passByDescriptionUrl = 'api/passages/passageFromDescription/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private passage = new BehaviorSubject<Passage>({} as Passage);

  constructor(private http: HttpClient, private configService: ConfigService) { }

  createPassage(passage: Passage): Observable<Passage> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Passage>(this.configService.mdrUrl + this.createUrl, passage, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
  updatePassage(passage: Passage): Observable<Passage> {
    const httpOptions = { withCredentials: true };

    return this.http.put<Passage>(this.configService.mdrUrl + this.updateUrl, passage, httpOptions)
      .pipe(
        //catchError(this.handleError('addPassage', passage))
      );
  }

  getBuildings(): Observable<Building[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Building[]>(this.configService.mdrUrl + this.listBuildingsUrl, httpOptions)
        .pipe(
            //catchError(this.handleError('addBuilding', building))
        );
  }

  getFloors(): Observable<Floor[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listFloorsUrl, httpOptions)
        .pipe(
            //catchError(this.handleError('addBuilding', building))
        );
  }

  getAllPassages(): Observable<Passage[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Passage[]>(this.configService.mdrUrl + this.listPassagesUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getPassagesByFloor(floorId: string): Observable<Passage[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Passage[]>(this.configService.mdrUrl + this.floorPassagesUrl + floorId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getPassageByDescription(description: string): Observable<Passage> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Passage>(this.configService.mdrUrl + this.passByDescriptionUrl + description, httpOptions)
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
