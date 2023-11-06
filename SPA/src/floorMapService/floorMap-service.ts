import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FloorMapService {

  private loadMapUrl = 'http://localhost:4000/api/loadMap';

  constructor(private http: HttpClient) { }

  loadFloorMap(floorMap: File | null): Observable<any> {
    if (!floorMap) {
      return throwError('File is missing');
    }
    const formData = new FormData();
    formData.append('file', floorMap);

    return this.http.patch<any>(this.loadMapUrl, formData)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}