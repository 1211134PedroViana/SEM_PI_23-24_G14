import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FloorMapService {

  private loadMapUrl = 'http://localhost:4000/api/loadMap';

  constructor(private http: HttpClient) { }

  loadFloorMap(floorMap: File | null): Observable<File> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.patch<File>(this.loadMapUrl, floorMap, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}