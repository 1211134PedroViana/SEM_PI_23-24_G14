import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import SystemUser from "../systemUserService/systemUser";
import Register from "./register";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:5095/api/Register';

  private isVisible = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<Register>({} as Register);
  constructor(private http: HttpClient) {}

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


  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
