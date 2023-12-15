import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import SystemUser from "./systemUser";
import Role from "./role";

@Injectable({
  providedIn: 'root'
})

export class SystemUserService {

  private createUrl = 'http://localhost:5095/api/SystemUsers';
  private getUserByIdUrl = 'http://localhost:5095/api/SystemUsers/';
  private getAllUsersUrl = 'http://localhost:5095/api/SystemUsers';
  private getAllRolesUrl = 'http://localhost:5095/api/Roles';
  private getRoleByIdUrl = 'http://localhost:5095/api/Roles/';
  private getUserByEmailUrl = 'http://localhost:5095/api/SystemUsers/searchByEmail/';
  private userByEmailUrl = 'http://localhost:5095/api/SystemUsers/byEmail/';

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

  getAllRoles(): Observable<Role[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Role[]>(this.getAllRolesUrl, httpOptions);
  }

  getRoleById(roleId: string): Observable<Role> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Role>(this.getRoleByIdUrl + roleId, httpOptions);
  }

  addSystemUser(user: SystemUser): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SystemUser>(this.createUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getUserById(userId: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.getUserByIdUrl + userId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllUsers(): Observable<SystemUser[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser[]>(this.getAllUsersUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getUserByEmail(email: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.getUserByEmailUrl + email, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  userByEmail(email: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.userByEmailUrl + email, httpOptions)
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
