import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import SystemUser from "./systemUser";
import Role from "./role";
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class SystemUserService {

  private createUrl = 'api/SystemUsers';
  private getUserByIdUrl = 'api/SystemUsers/';
  private getAllUsersUrl = 'api/SystemUsers';
  private getAllRolesUrl = 'api/Roles';
  private getRoleByIdUrl = 'api/Roles/';
  private getUserByEmailUrl = 'api/SystemUsers/searchByEmail/';
  private userByEmailUrl = 'api/SystemUsers/byEmail/';
  private updateUrl = 'api/SystemUsers/UpdateSystemUser/';

  private isVisible = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<SystemUser>({} as SystemUser);

  // @ts-ignore
  @Component({
    selector: 'app-create-systemUser-form',
    templateUrl: './create-systemUser-form.component.html',
    styleUrls: ['./create-systemUser-form.component.css']
  })

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getAllRoles(): Observable<Role[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Role[]>(this.configService.mduUrl + this.getAllRolesUrl, httpOptions);
  }

  getRoleById(roleId: string): Observable<Role> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Role>(this.configService.mduUrl + this.getRoleByIdUrl + roleId, httpOptions);
  }

  addSystemUser(user: SystemUser): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SystemUser>(this.configService.mduUrl + this.createUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  updateSystemUser(user: SystemUser): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.patch<SystemUser>(this.configService.mduUrl + this.updateUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getUserById(userId: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.configService.mduUrl + this.getUserByIdUrl + userId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getAllUsers(): Observable<SystemUser[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser[]>(this.configService.mduUrl + this.getAllUsersUrl, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  getUserByEmail(email: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.configService.mduUrl + this.getUserByEmailUrl + email, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  userByEmail(email: string): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SystemUser>(this.configService.mduUrl + this.userByEmailUrl + email, httpOptions)
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

  getSystemUser() {
    return this.user.asObservable();
  }

}
