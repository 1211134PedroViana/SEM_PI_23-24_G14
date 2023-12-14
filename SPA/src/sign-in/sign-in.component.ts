import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/authService/auth.service';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private userService: SystemUserService, 
    private router: Router, private snackBar: MatSnackBar) {
  }

  onSubmit(): void {
    if(this.email.trim() === "" || this.password.trim() === "") {
      const message = 'Error: Email and Password cant be empty, Try again';
      this.snackBar.open(message, 'Close', {
        duration: 5000, 
      });
    }else{

      
      this.userService.getUserByEmail(this.email)
      .pipe(
        tap((response) => {

          this.userService.getRoleById(response.roleId)
          .pipe(
            tap((response2) => {

              this.authService.login(response)
              .pipe(
                tap((response3) => {
    
                  this.navigateToMenu(response2.name);
    
                }),
                catchError((error) => {
                  console.error('Password is incorrect', error);
                  this.snackBar.open('Incorrect Password, Try again', 'Close', {
                  duration: 5000, // 5 seconds
                });
                throw error;
                })
              )
              .subscribe();

            }),
            catchError((error) => {
              console.error('Role not found', error);
              this.snackBar.open('User Role not found', 'Close', {
              duration: 5000, // 5 seconds
            });
            throw error;
            })
          )
          .subscribe();
          
        }),
        catchError((error) => {
          console.error('Error user not found', error);
          this.snackBar.open('User not found with email:' + this.email, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();

    }
  }

  startRegistration() {
    this.router.navigate(['/register']);
  }

  navigateToMenu(role: string) {
    switch (role) {
      case "Campus":
          this.router.navigate(["/campus"]);
          break;
      case "Fleet":
          this.router.navigate(["/fleet"]);
          break;
      case "Task":
          this.router.navigate(["/task"]);
          break;
      case "Admin":
          this.router.navigate(["/admin"]);
          break;
      default:
          this.router.navigate(["/user"]);
          break;
    }
  
  }

}
