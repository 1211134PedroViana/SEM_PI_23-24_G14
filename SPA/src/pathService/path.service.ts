import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import Path from './path';


@Injectable({
  providedIn: 'root'
})

export class PathService {

  constructor(private http: HttpClient) { }

  computePath(elementOrig: string, elementDest: string): Observable<Path> {
    let url = `http://localhost:5000/findPath?origem=${elementOrig}&destino=${elementDest}`;

    const httpOptions = { withCredentials: true };
    
    return this.http.get<Path>(url)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      )
  }

}