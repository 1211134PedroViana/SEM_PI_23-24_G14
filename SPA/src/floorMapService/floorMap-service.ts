import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import FloorMap from './floorMap';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class FloorMapService {

  private loadMapUrl = 'api/loadMap';
  private getFloorMapUrl = 'api/loadMap/'

  constructor(private http: HttpClient, private configService: ConfigService) { }

  loadFloorMap(floorMap: File | null): Observable<any> {
    if (!floorMap) {
      return throwError('File is missing');
    }
    const formData = new FormData();
    formData.append('file', floorMap);

    return this.http.patch<any>(this.configService.mdrUrl + this.loadMapUrl, formData)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getFloorMap(floorId: string): Observable<FloorMap> {
    const httpOptions = { withCredentials: true };
    if (floorId === null) {
      return throwError('Floor ID is missing');
    }

    return this.http.get<FloorMap>(this.configService.mdrUrl + this.getFloorMapUrl + floorId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}