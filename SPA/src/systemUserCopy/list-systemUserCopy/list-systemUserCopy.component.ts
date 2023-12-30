import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import SystemUserCopy from 'src/systemUserCopyService/systemUserCopy';
import { SystemUserCopyService } from 'src/systemUserCopyService/systemUserCopy.service';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
    selector: 'app-list-systemUserCopy',
    templateUrl: './list-systemUserCopy.component.html',
    styleUrls: ['./list-systemUserCopy.component.css']
})

export class ListSystemUserCopyComponent implements OnInit { 

    copies: SystemUserCopy[] = [];

    constructor(private systemUserCopyService: SystemUserCopyService) { }

    ngOnInit(): void {
        this.loadCopies();
    }

    loadCopies() {
        this.systemUserCopyService.getAllCopies()
            .pipe(
                tap((response) => {
                    this.copies = response;
                }),
                catchError((error) => {
                    console.error(`Error occurred while listing system user copies`);
                    throw error;
                })
            )
            .subscribe();
    }

}