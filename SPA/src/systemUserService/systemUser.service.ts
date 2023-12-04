import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import SystemUser from "./systemUser";

@Injectable({
  providedIn: 'root'
})

export class SystemUserService {

  private createUrl = 'http://localhost:4000/api/systemUser/create';

  private isVisible = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<SystemUser>({} as SystemUser);

  // @ts-ignore
  @Component({
    selector: 'app-create-systemUser-form',
    templateUrl: './create-systemUser-form.component.html',
    styleUrls: ['./create-systemUser-form.component.css']
  })

  constructor(private http: HttpClient) {
  }

  addSystemUser(user: SystemUser): Observable<SystemUser> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<SystemUser>(this.createUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  openForm(user: SystemUser) {
    this.user.next(user);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

}
