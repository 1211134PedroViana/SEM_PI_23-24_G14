import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {SystemUserService} from "../../systemUserService/systemUser.service";
import SystemUser from "../../systemUserService/systemUser";
import { AuthService } from 'src/authService/auth.service';

@Component({
    selector: 'app-remove-systemUser-form',
    templateUrl: './remove-systemUser-form.component.html',
    styleUrls: ['./remove-systemUser-form.component.css']
})

export class RemoveSystemUserFormComponent {

    email: string = " ";

    selectedSystemUser: any;

    constructor(private systemUserService: SystemUserService, private authService: AuthService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.authService.auth().subscribe((systemUser) => {
            this.selectedSystemUser = systemUser;
            console.log(this.selectedSystemUser);
        })
    }

    closeForm() {
        this.systemUserService.closeForm();
    }

    onSubmit() {
        const systemUserData = ({
            email: this.selectedSystemUser.email,
            password: this.selectedSystemUser.password,
            roleId: this.selectedSystemUser.roleId,
            phoneNumber: this.selectedSystemUser.phoneNumber,
            contribuinte: this.selectedSystemUser.contribuinte
        }) as SystemUser;

        this.systemUserService.removeSystemUser(systemUserData)
            .pipe(
                tap((response) => {
                    console.log('SystemUser removed successfully', response);
                    const message = `SystemUser removed successfully! | Email: ${response.email}`
                    this.snackBar.open(message, 'Close', {
                        duration: 5000, //5 seconds
                    });
                }),
                catchError((error) => {
                    console.error('Error occurred while removing the systemUser, returned code:' + error.status);
                    this.snackBar.open('Failed to update systemUser, returned code:' + error.status, 'Close', {
                        duration: 5000, //5 seconds
                    });
                    throw error;
                })
            )
            .subscribe();
    }

}