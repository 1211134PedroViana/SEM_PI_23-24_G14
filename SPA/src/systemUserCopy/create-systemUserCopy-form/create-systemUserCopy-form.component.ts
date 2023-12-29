import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { SystemUserService } from 'src/systemUserService/systemUser.service';
import { catchError, tap } from 'rxjs/operators';
import SystemUser from 'src/systemUserService/systemUser';
import { AuthService } from 'src/authService/auth.service';
import { SystemUserCopyService } from 'src/systemUserCopyService/systemUserCopy.service';
import SystemUserCopy from 'src/systemUserCopyService/systemUserCopy';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-systemUserCopy-form',
    templateUrl: './create-systemUserCopy-form.component.html',
    styleUrls: ['./create-systemUserCopy-form.component.css']
})

export class CreateSystemUserCopyFormComponent {

    now = new Date();

    date: string= " ";
    hour: string = " ";
    email: string = " ";
    role: string = " ";
    phoneNumber: string = '';
    contribuinte: string = '';

    selectedSystemUser: any;
    selectedDate: any;
    selectedTime: any;

    constructor(private systemUserCopyService: SystemUserCopyService, private authService: AuthService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.selectedDate = this.now.toLocaleDateString();
        this.selectedTime = this.now.toLocaleTimeString();

        this.authService.auth().subscribe((systemUser) => {
            this.selectedSystemUser = systemUser;
            console.log(this.selectedSystemUser);
        })
    }

    closeForm() {
        this.systemUserCopyService.closeForm();
    }

    onSubmit() {
        const systemUserCopyData = ({
            date: this.now.toLocaleDateString(),
            hour: this.now.toLocaleTimeString(),
            email: this.selectedSystemUser.email,
            roleId: this.selectedSystemUser.roleId,
            phoneNumber: "123456789",
            contribuinte: "123456789"
        }) as SystemUserCopy;

        this.systemUserCopyService.addSystemUserCopy(systemUserCopyData)
            .pipe(
                tap((response) => {
                    console.log('System User Copy created successfully', response);
                    const message = `System User Copy created successfully! | Date: ${response.date} | Hour: ${response.hour} | Email: ${response.email}`;
                    this.snackBar.open(message, 'Close', {
                        duration: 5000, // 5 seconds
                    });
                }),
                catchError((error) => {
                    console.error('Error occurred while creating the System User Copy', error);
                    this.snackBar.open('Failed to create System User Copy, returned code:' + error.status, 'Close', {
                      duration: 5000, // 5 seconds
                    });
                    throw error;
                })
            )
            .subscribe();
    }
}