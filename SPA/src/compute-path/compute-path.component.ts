import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Building from 'src/buildingService/building';
import { BuildingService } from 'src/buildingService/building.service';
import Floor from 'src/floorService/floor';
import { FloorService } from 'src/floorService/floor-service';
import { PassageService } from 'src/passageService/passage.service';
import { PathService } from 'src/pathService/path.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-compute-path',
  templateUrl: './compute-path.component.html',
  styleUrls: ['./compute-path.component.css']
})
export class ComputePathComponent {

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
    private floorService: FloorService, private snackBar: MatSnackBar) { }

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
    this.getElementsFromType(this.selectedOrig);
  }

  onFloorDestChange() {
    this.elementsDest = [];
    this.getElementsFromType(this.selectedDest);
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
          console.error('Error occurred while creating the Passage', error);
          this.snackBar.open('Failed to create passage, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  getElementsFromType(type: string): string {
    let mensagem: string;

    switch (type) {
        case "sala":
            mensagem = "Segunda-feira";
            break;
        case "elev":
            mensagem = "Terça-feira";
            break;
        case "pass":
            mensagem = "Quarta-feira";
            break;
        default:
            mensagem = "Dia inválido";
    }

    return mensagem;
  }
}
