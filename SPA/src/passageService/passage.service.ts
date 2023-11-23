import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import Passage from './passage';
import Elevator from "../elevatorService/elevator";


@Injectable({
  providedIn: 'root'
})

export class PassageService {

  private createUrl = 'http://localhost:4000/api/passages/create';
  private updateUrl = 'http://localhost:4000/api/passages/update';
  private listUrl = 'http://localhost:4000/api/passages/list';

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

  getAllPassages(): Observable<Passage[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Passage[]>(this.listUrl, httpOptions)
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
}
