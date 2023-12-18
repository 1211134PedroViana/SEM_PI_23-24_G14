import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SystemUser from 'src/systemUserService/systemUser';
import AuthSystemUser from 'src/systemUserService/authSystemUser';
import { ConfigService } from '../config.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'http://localhost:5095/api/Auth/login/';
  private sessionUrl = 'http://localhost:5095/api/Auth/session/';

  constructor(private http: HttpClient) {
  }

  login(user: AuthSystemUser): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SystemUser>(this.loginUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
    );
  }

  auth(): Observable<AuthSystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<AuthSystemUser>(this.sessionUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
    );
  }


}