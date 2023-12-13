import { Component } from '@angular/core';
import SystemUser from "../../systemUserService/systemUser";
import {catchError, tap} from "rxjs/operators";
import {SystemUserService} from "../../systemUserService/systemUser.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = " ";
  password: string = "";
  role: string = " ";
  phoneNumber: string = '';
  contribuinte: string = '';
  roles: any;

  constructor(private systemUserService: SystemUserService,  private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.systemUserService.getAllRoles()
      .pipe(
        tap((roles) => {
          this.roles = roles;
        }),
        catchError((error) => {
          console.error('Error occurred while fetching roles', error);
          // Handle error as needed
          return [];
        })
      )
      .subscribe();
  }

  closeForm() {
    this.systemUserService.closeForm();
  }

  onSubmit() {
      const systemUserData = ({
        email: this.email,
        password: this.password,
        roleId: this.role,
        phoneNumber: this.phoneNumber,
        contribuinte: this.contribuinte
      }) as SystemUser;

    this.systemUserService.addSystemUser(systemUserData)
      .pipe(
        tap((response) => {
          console.log('System User created successfully', response);
          const message = `System User requested successfully! | Email: ${response.email} | Role: ${response.roleId}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while request to create the System User', error);
          this.snackBar.open('Failed to create System User, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }
}
