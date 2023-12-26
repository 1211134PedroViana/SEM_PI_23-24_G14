import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import Role from "./role";
import { ConfigService } from '../config.service';
import SystemUserCopy from './systemUserCopy';

@Injectable({
    providedIn: 'root'
})

export class SystemUserCopyService {
    
    private createUrl = 'api/SystemUsersCopy';
    private userByEmailUrl = 'api/SystemUsersCopy/byEmail/';
    private dayUrl = 'api/SystemUsersCopy/GetDay/';
    private timeUrl = 'api/SystemUsersCopy/GetTime/';

    private isVisible = new BehaviorSubject<boolean>(false);
    private user = new BehaviorSubject<SystemUserCopy>({} as SystemUserCopy);

    // @ts-ignore
    @Component({
        selector: 'app-create-systemUserCopy-form',
        templateUrl: './create-systemUserCopy-form.component.html',
        styleUrls: ['./create-systemUserCopy-form.component.css']
    })

    constructor(private http: HttpClient, private configService: ConfigService){}

    addSystemUserCopy(user: SystemUserCopy): Observable<SystemUserCopy> {
        const httpOptions = { withCredentials: true };

        return this.http.post<SystemUserCopy>(this.configService.mduUrl + this.createUrl, user, httpOptions)
            .pipe(
              //catchError(this.handleError('addBuilding', building))
        )
    }

    getDateString(): Observable<string> {
        const httpOptions = { withCredentials: true };

        return this.http.get<string>(this.configService.mduUrl + this.dayUrl, httpOptions);
    }

    getTimeString(): Observable<string> {
        const httpOptions = { withCredentials: true };

        return this.http.get<string>(this.configService.mduUrl + this.timeUrl, httpOptions);
    }

    closeForm() {
        this.isVisible.next(false);
    }

    getFormVisibility() {
        return this.isVisible.asObservable();
    }

    getSystemUserCopy() {
        return this.user.asObservable();
    }

    
}