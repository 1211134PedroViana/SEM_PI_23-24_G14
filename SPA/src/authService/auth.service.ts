import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SystemUser from 'src/systemUserService/systemUser';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'http://localhost:5095/api/Authentication/login/';

  constructor(private http: HttpClient) {
  }

  login(user: SystemUser): Observable<SystemUser> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<SystemUser>(this.loginUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
    );
  }

}