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

@Component({
  selector: 'app-surveillance-task-form',
  templateUrl: './surveillance-task-form.component.html',
  styleUrls: ['./surveillance-task-form.component.css']
})
export class SurveillanceTaskFormComponent {

  buildings: Building[] = [];
  floors: Floor[] = [];
  elementsOrig: any[] = [];
  elementsDest: any[] = [];
  selectedTypeOrig = '';
  selectedTypeDest = '';
  selectedBuilding = '';
  selectedFloors: boolean[] = [];
  selectedOrig = '';
  selectedDest = '';

  phoneNumber = '';

  constructor(private taskService: TaskService, private router: Router, private pathService: PathService, private passageService: PassageService, private buildingService: BuildingService,
    private floorService: FloorService, private roomService: RoomService, private elevatorService: ElevatorService, private snackBar: MatSnackBar) { }

  ngOnInit() {
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
        this.selectedFloors = new Array(this.floors.length).fill(false);
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

    this.pathService.computePath(this.selectedOrig, this.selectedDest)
      .pipe(
        tap((response) => {
          console.log('Path found sucessfully!', response);
          const message = `Path found successfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while find the Path', error);
          this.snackBar.open('Failed to find Path, returned code:' + error.status, 'Close', {
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
          for(let i = 0; i < this.selectedFloors.length; i++) {
            if(this.selectedFloors[i]) {
              this.roomService.getRoomsByFloor(this.floors[i].id).subscribe((rooms: Room[]) => {
                rooms.forEach(room => {
                  this.elementsOrig.push(room.description);
                });
              });
            }
          }
          break;

        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuilding).subscribe((elevator) => {
            this.elementsOrig.push(elevator.description);
          });
          break;

        case "pass":
          for(let i = 0; i < this.selectedFloors.length; i++) {
            if(this.selectedFloors[i]) {
              this.passageService.getPassagesByFloor(this.floors[i].id).subscribe((passages: Passage[]) => {
                passages.forEach(passage => {
                  this.elementsOrig.push(passage.description);
                });
              });
            }
          }
          break;

        default:
            mensagem = "Dia inválido";
    }
  }

  getElementsFromType2(type: string): void {
    let mensagem: string;

    switch (type) {
        case "sala":
          for(let i = 0; i < this.selectedFloors.length; i++) {
            if(this.selectedFloors[i]) {
              this.roomService.getRoomsByFloor(this.floors[i].id).subscribe((rooms: Room[]) => {
                rooms.forEach(room => {
                  this.elementsDest.push(room.description);
                });
              });
            }
          }
          break;

        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuilding).subscribe((elevator) => {
            this.elementsDest.push(elevator.description);
          });
          break;

        case "pass":
          for(let i = 0; i < this.selectedFloors.length; i++) {
            if(this.selectedFloors[i]) {
              this.passageService.getPassagesByFloor(this.floors[i].id).subscribe((passages: Passage[]) => {
                passages.forEach(passage => {
                  this.elementsDest.push(passage.description);
                });
              });
            }
          }
          break;

        default:
            mensagem = "Dia inválido";
    }
  }
}
