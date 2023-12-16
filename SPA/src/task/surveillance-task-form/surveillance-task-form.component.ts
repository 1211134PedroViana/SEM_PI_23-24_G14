import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Building from 'src/buildingService/building';
import { BuildingService } from 'src/buildingService/building.service';
import Floor from 'src/floorService/floor';
import { TaskService } from 'src/taskService/task.service';
import { FloorService } from 'src/floorService/floor-service';
import { PassageService } from 'src/passageService/passage.service';
import { PathService } from 'src/pathService/path.service';
import { catchError, tap } from 'rxjs/operators';
import { RoomService } from 'src/roomService/room.service';
import Room from 'src/roomService/room';
import { ElevatorService } from 'src/elevatorService/elevator.service';
import Passage from 'src/passageService/passage';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import { AuthService } from 'src/authService/auth.service';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-surveillance-task-form',
  templateUrl: './surveillance-task-form.component.html',
  styleUrls: ['./surveillance-task-form.component.css']
})
export class SurveillanceTaskFormComponent {

  userId: string = '';
  buildings: Building[] = [];
  floors: Floor[] = [];
  elementsOrig: any[] = [];
  elementsDest: any[] = [];
  selectedTypeOrig = '';
  selectedTypeDest = '';
  selectedBuilding = '';
  selectedFloor: string = '';
  selectedOrig = '';
  selectedDest = '';

  phoneNumber = '';

  constructor(private taskService: TaskService, private authService: AuthService, private userService: SystemUserService, 
    private router: Router, private pathService: PathService, private passageService: PassageService, private buildingService: BuildingService,
    private floorService: FloorService, private roomService: RoomService, private elevatorService: ElevatorService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.auth().subscribe((authUser) => {
      this.userService.userByEmail(authUser.email).subscribe((user) => {
          this.userId = user.id;
      });
    });
    this.buildingService.getAllBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
  }

  closeForm() {
    this.router.navigate(["/user/requestTask"]);
  }

  onBuildingChange() {
    this.floors = [];
    this.elementsOrig = [];
    this.floorService.getFloorsFromBuilding(this.selectedBuilding).subscribe((floors: Floor[]) => {
        this.floors = floors;
    });
  }

  onFloorChange() {
    this.elementsOrig = [];
    this.elementsDest = [];
    this.selectedTypeOrig = '';
    this.selectedTypeDest = '';
  }

  onTypeChange1() {
    this.elementsOrig = [];
    this.getElementsFromType1(this.selectedTypeOrig);
  }

  onTypeChange2() {
    this.elementsDest = [];
    this.getElementsFromType2(this.selectedTypeDest);
  }

  onSubmit() {

    const surveillanceTask = ({
      buildingId: this.selectedBuilding,
      floorId: this.selectedFloor,
      startPlace: this.selectedOrig,
      endPlace: this.selectedDest,
      phoneNumber: this.phoneNumber,
      userId: this.userId
    }) as SurveillanceTask;

    this.taskService.createSurveillanceTask(surveillanceTask)
      .pipe(
        tap((response) => {
          console.log('Surveillance task requested sucessfully!', response);
          const message = `Surveillance task requested sucessfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while requesting Surveillance task', error);
          this.snackBar.open('Failed to requesting Surveillance task, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  getElementsFromType1(type: string): void {
    let mensagem: string;

    switch (type) {
        case "sala":
    
          this.roomService.getRoomsByFloor(this.selectedFloor).subscribe((rooms: Room[]) => {
            rooms.forEach(room => {
              this.elementsOrig.push(room.description);
            });
          });
            
          break;

        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuilding).subscribe((elevator) => {
            this.elementsOrig.push(elevator.description);
          });
          break;

        case "pass":
          
          this.passageService.getPassagesByFloor(this.selectedFloor).subscribe((passages: Passage[]) => {
            passages.forEach(passage => {
              this.elementsOrig.push(passage.description);
            });
          });
            
          
          break;

        default:
            mensagem = "Dia inválido";
    }
  }

  getElementsFromType2(type: string): void {
    let mensagem: string;

    switch (type) {
        case "sala":
         
          this.roomService.getRoomsByFloor(this.selectedFloor).subscribe((rooms: Room[]) => {
            rooms.forEach(room => {
              this.elementsDest.push(room.description);
            });
          });
            
          
          break;

        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuilding).subscribe((elevator) => {
            this.elementsDest.push(elevator.description);
          });
          break;

        case "pass":
         
          this.passageService.getPassagesByFloor(this.selectedFloor).subscribe((passages: Passage[]) => {
            passages.forEach(passage => {
              this.elementsDest.push(passage.description);
            });
          });
          
          break;

        default:
            mensagem = "Dia inválido";
    }
  }
}
