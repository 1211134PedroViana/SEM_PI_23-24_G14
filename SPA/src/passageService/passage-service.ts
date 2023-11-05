import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Passage from './passage';


@Injectable({
  providedIn: 'root'
})

export class PassageService {

  private createUrl = 'http://localhost:4000/api/passages/create';
  private updateUrl = 'http://localhost:4000/api/passages/update';
  private listUrl = 'http://localhost:4000/api/passages/list';

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
}