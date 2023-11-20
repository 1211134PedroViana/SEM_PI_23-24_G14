import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Robot from './robot';

@Injectable({
    providedIn: 'root'
})

export class RobotService {
    
    private createUrl = 'http://localhost:4000/api/robots/create';
    private updateUrl = 'http://localhost:4000/api/robots/update';
    private listUrl = 'http://localhost:4000/api/robots/list';
    private deactivateUrl = 'http://localhost:4000/api/robots/deactivate';
  
    private isVisible = new BehaviorSubject<boolean>(false);
    private robot = new BehaviorSubject<Robot>({} as Robot);

    constructor(private http: HttpClient) { }

    addRobot(robot: Robot): Observable<Robot> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post<Robot>(this.createUrl, robot, httpOptions)
            .pipe(
              //catchError(this.handleError('addRobot', robot))  
            );
    }

    updateRobot(robot: Robot): Observable<Robot> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        };

        return this.http.put<Robot>(this.updateUrl, robot, httpOptions)
            .pipe(
                //catchError(this.handleError('addRobot', robot))
            )
    }

    getAllRobots(): Observable<Robot[]> {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    
        return this.http.get<Robot[]>(this.listUrl, httpOptions)
          .pipe(
            //catchError(this.handleError('addRobot', robot))
        );
    }

    deactivateRobot(robotId: string): Observable<Robot> {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    
        return this.http.patch<Robot>(this.deactivateUrl, httpOptions)
          .pipe(
            //catchError(this.handleError('addRobot', robot))
        );
    }
    
    openForm(robot: Robot) {
        this.robot.next(robot);
        this.isVisible.next(true);
    }
    
    closeForm() {
        this.isVisible.next(false);
    }
    
    getFormVisibility() {
        return this.isVisible.asObservable();
    }
    
    getRobot() {
        return this.robot.asObservable();
    }
    
}