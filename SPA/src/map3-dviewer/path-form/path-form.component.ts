import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Building from 'src/buildingService/building';
import { BuildingService } from 'src/buildingService/building.service';
import Floor from 'src/floorService/floor';
import { FloorService } from 'src/floorService/floor-service';
import { PassageService } from 'src/passageService/passage.service';
import { PathService } from 'src/pathService/path.service';
import { catchError, tap } from 'rxjs/operators';
import { RoomService } from 'src/roomService/room.service';
import Room from 'src/roomService/room';
import { ElevatorService } from 'src/elevatorService/elevator.service';
import Elevator from 'src/Thumb_Raiser/elevator';
import Passage from 'src/passageService/passage';
import Cell from 'src/pathService/cell';

@Component({
  selector: 'app-path-form',
  templateUrl: './path-form.component.html',
  styleUrls: ['./path-form.component.css']
})
export class PathFormComponent {

  isFormVisible: boolean = true;
  isViewerVisible: boolean = false;

  path: string[] = [];
  cellsPath: Cell[][] = [];

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

  constructor(private pathService: PathService, private passageService: PassageService, private buildingService: BuildingService,
    private floorService: FloorService, private roomService: RoomService, private elevatorService: ElevatorService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.buildingService.getAllBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
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

    this.pathService.computePath(this.selectedOrig, this.selectedDest)
      .pipe(
        tap((response) => {
          console.log('Path found sucessfully!', response);
          const message = `Path found successfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });

          this.path = response.caminho;
          this.cellsPath = response.movimentos;

          this.isFormVisible = false;
          this.isViewerVisible = true;

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
