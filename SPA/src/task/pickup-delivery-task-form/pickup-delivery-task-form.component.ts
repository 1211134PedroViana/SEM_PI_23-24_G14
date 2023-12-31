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
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';
import { AuthService } from 'src/authService/auth.service';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-pickup-delivery-task-form',
  templateUrl: './pickup-delivery-task-form.component.html',
  styleUrls: ['./pickup-delivery-task-form.component.css']
})
export class PickupDeliveryTaskFormComponent {

  buildings: Building[] = [];
  floorsOrig: Floor[] = [];
  floorsDest: Floor[] = [];
  elementsOrig: any[] = [];
  elementsDest: any[] = [];
  selectedTypeOrig = '';
  selectedTypeDest = '';
  selectedBuildingOrig = '';
  selectedBuildingDest = '';
  selectedFloorOrig = '';
  selectedFloorDest = '';
  selectedOrig = '';
  selectedDest = '';

  userId: string = '';
  pickupName: string = '';
  pickupNumber: string = '';
  deliveryName: string = '';
  deliveryNumber: string = '';
  confirmationCode: string = '';
  description: string = '';

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router, private passageService: PassageService, 
    private buildingService: BuildingService, private floorService: FloorService, private roomService: RoomService, 
    private elevatorService: ElevatorService, private userService: SystemUserService, private snackBar: MatSnackBar) { }

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

  onBuildingOrigChange() {
    this.floorsOrig = [];
    this.elementsOrig = [];
    this.floorService.getFloorsFromBuilding(this.selectedBuildingOrig).subscribe((floors: Floor[]) => {
        this.floorsOrig = floors;
    });
  }

  onBuildingDestChange() {
    this.floorsDest = [];
    this.elementsDest = [];
    this.floorService.getFloorsFromBuilding(this.selectedBuildingDest).subscribe((floors: Floor[]) => {
        this.floorsDest = floors;
    });
  }

  onFloorOrigChange() {
    this.elementsOrig = [];
    this.getElementsFromType1(this.selectedTypeOrig);
  }

  onFloorDestChange() {
    this.elementsDest = [];
    this.getElementsFromType2(this.selectedTypeDest);
  }

  onSubmit() {
    
    const pickupAndDeliveryTask = ({
      pickupPlace: this.selectedOrig,
      deliveryPlace: this.selectedDest,
      pickupPersonName: this.pickupName,
      pickupPersonPhoneNumber: this.pickupNumber,
      deliveryPersonName: this.deliveryName,
      deliveryPersonPhoneNumber: this.deliveryNumber,
      description: this.description,
      confirmationCode: this.confirmationCode,
      userId: this.userId
    }) as PickupAndDeliveryTask;

    this.taskService.createPickupAndDeliveryTask(pickupAndDeliveryTask)
      .pipe(
        tap((response) => {
          console.log('PickupAndDelivery Task  requested sucessfully!', response);
          const message = `PickupAndDelivery Task  requested sucessfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while requesting PickupAndDelivery Task ', error);
          this.snackBar.open('Failed to requesting PickupAndDelivery Task, returned code:' + error.status, 'Close', {
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
          this.roomService.getRoomsByFloor(this.selectedFloorOrig).subscribe((rooms: Room[]) => {
            rooms.forEach(room => {
              this.elementsOrig.push(room.description);
            });
          });
          break;
        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuildingOrig).subscribe((elevator) => {
            this.elementsOrig.push(elevator.description);
          });
          break;
        case "pass":
          this.passageService.getPassagesByFloor(this.selectedFloorOrig).subscribe((passages: Passage[]) => {
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
          this.roomService.getRoomsByFloor(this.selectedFloorDest).subscribe((rooms: Room[]) => {
            rooms.forEach(room => {
              this.elementsDest.push(room.description);
            });
          });
          break;
        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuildingDest).subscribe((elevator) => {
            this.elementsDest.push(elevator.description);
          });
          break;
        case "pass":
          this.passageService.getPassagesByFloor(this.selectedFloorDest).subscribe((passages: Passage[]) => {
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
