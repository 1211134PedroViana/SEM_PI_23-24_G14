import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {SystemUserService} from "../../systemUserService/systemUser.service";
import SystemUser from "../../systemUserService/systemUser";


@Component({
  selector: 'app-create-systemUser-form',
  templateUrl: './create-systemUser-form.component.html',
  styleUrls: ['./create-systemUser-form.component.css']
})

export class CreateSystemUserFormComponent {

  email: string = " ";
  password: string = " ";
  role: string = " ";

  constructor(private systemUserService: SystemUserService, private snackBar: MatSnackBar) { }

  closeForm() {
    this.systemUserService.closeForm();
  }

  onSubmit() {
    const systemUserData = ({
      email: this.email,
      password: this.password,
      role: this.role
    }) as SystemUser;

    this.systemUserService.addSystemUser(systemUserData)
      .pipe(
        tap((response) => {
          console.log('System User created successfully', response);
          const message = `Building created successfully! | Email: ${response.email} | Role: ${response.role}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the System User', error);
          this.snackBar.open('Failed to create building, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }
}