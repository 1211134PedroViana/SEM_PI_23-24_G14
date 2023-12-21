import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { SystemUserService } from 'src/systemUserService/systemUser.service';
import { catchError, tap } from 'rxjs/operators';
import SystemUser from 'src/systemUserService/systemUser';
import { AuthService } from 'src/authService/auth.service';

@Component({
    selector: 'app-update-systemUser-form',
    templateUrl: './update-systemUser-form.component.html',
    styleUrls: ['./update-systemUser-form.component.css']
})

export class UpdateSystemUserFormComponent {

    email: string = " ";
    password: string = "";
    role: string = " ";
    phoneNumber: string = '';
    contribuinte: string = '';
    roles: any;

    selectedSystemUser: any;

    constructor(private systemUserService: SystemUserService, private authService: AuthService,private snackBar: MatSnackBar) { }

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
        /*
        const systemUserData = ({
            email: this.email,
            password: this.password,
            roleId: this.role,
            phoneNumber: this.phoneNumber,
            contribuinte: this.contribuinte
        }) as SystemUser;
        */

        const systemUserData = ({
            id: this.selectedSystemUser.id,
            email: this.selectedSystemUser.email,
            password: this.selectedSystemUser.password,
            roleId: this.selectedSystemUser.roleId,
            phoneNumber: this.selectedSystemUser.phoneNumber,
            contribuinte: this.selectedSystemUser.contribuinte
        }) as SystemUser;
        

        this.systemUserService.updateSystemUser(this.selectedSystemUser.id)
            .pipe(
                tap((response) => {
                    console.log('SystemUser updated successfully', response);
                    const message = `SystemUser updated successfully! | Email: ${response.email} | RoleId: ${response.roleId} | PhoneNumber: ${response.phoneNumber} | Contribuinte: ${response.contribuinte}`;
                    this.snackBar.open(message, 'Close', {
                        duration: 5000, //5 seconds
                    });
                }),
                catchError((error) => {
                    console.log(systemUserData.email);
                    console.log(systemUserData.password);
                    console.log(systemUserData.roleId);
                    console.log(systemUserData.phoneNumber);
                    console.log(systemUserData.contribuinte);
                    console.error('Error occurred while updating the systemUser, returned code:' + error.status);
                    this.snackBar.open('Failed to update systemUser, returend code:' + error.status, 'Close', {
                        duration:  5000, //5 seconds
                    });
                    throw error;
                })
            )
            .subscribe();
    }
}