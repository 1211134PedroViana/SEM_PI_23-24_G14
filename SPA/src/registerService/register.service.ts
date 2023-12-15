import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import SystemUser from "../systemUserService/systemUser";
import Register from "./register";
import Role from "../systemUserService/role";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private createUrl = 'http://localhost:5095/api/Registers';

  private isVisible = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<Register>({} as Register);

  // @ts-ignore
  @Component({
    selector: 'app-create-systemUser-form',
    templateUrl: './create-register.component.html',
    styleUrls: ['./create-register.component.css']
  })

  constructor(private http: HttpClient) {
  }

  addRegister(user: Register): Observable<Register> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Register>(this.createUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }

  openForm(user: Register) {
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
