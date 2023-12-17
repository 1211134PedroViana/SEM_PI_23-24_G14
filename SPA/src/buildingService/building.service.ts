import {Component, Injectable} from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Building from './building';
import Floor from 'src/floorService/floor';

@Injectable({
  providedIn: 'root'
})

export class BuildingService {

  private createUrl = 'api/buildings/create';
  private updateUrl = 'api/buildings/update';
  private listUrl = 'api/buildings/list';
  private listUrlBuildingsWithMinAndMaxFloors = 'api/buildings/listAllBuildignsWithMinAndMaxFloors/Min/:min/Max/:max';
  private buildingByIdUrl = 'api/buildings/buildingById/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private building = new BehaviorSubject<Building>({} as Building);

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  buildings: Building[] = [];

  addBuilding(building: Building): Observable<Building> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Building>(this.configService.mdrUrl + this.createUrl, building, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateBuilding(building: Building): Observable<Building> {
    const httpOptions = { withCredentials: true };

    return this.http.put<Building>(this.configService.mdrUrl + this.updateUrl, building, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllBuildings(): Observable<Building[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Building[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getBuildingById(buildingId: string): Observable<Building> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Building>(this.configService.mdrUrl + this.buildingByIdUrl + buildingId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllBuildingsWithMinAndMaxFloors(min: number, max: number): Observable<Building[]> {
    const httpOptions = { withCredentials: true };
  
    //const urlWithParams = `${this.listUrlBuildingsWithMinAndMaxFloors}?min=${min}&max=${max}`;
    const urlWithParams = 'http://localhost:4000/api/buildings/listAllBuildignsWithMinAndMaxFloors/Min/'+min+'/Max/'+max;


    return this.http.get<Building[]>(urlWithParams, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error in the HTTP request:', error);
          throw error;
        })
      );
  }
  

  getAllFloors(): Observable<Floor[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floor[]>(this.configService.mdrUrl + this.listUrl, httpOptions)
    .pipe(
      //catchError(this.handleError('listFloors', floor))
    );

  }

  openForm(building: Building) {
    this.building.next(building);
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
