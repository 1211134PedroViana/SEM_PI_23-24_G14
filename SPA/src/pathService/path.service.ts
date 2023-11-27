import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class PathService {

  constructor(private http: HttpClient) { }

  computePath(elementOrig: string, elementDest: string): Observable<JSON> {
    let url = `http://localhost:5000/findCaminho?origem=${elementOrig}&destino=${elementDest}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<JSON>(url, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

}