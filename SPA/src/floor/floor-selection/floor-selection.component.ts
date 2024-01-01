import {Component, OnInit} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { FloorService } from '../../floorService/floor-service';
import Floor from 'src/floorService/floor';
import FloorMap from "../../floorMapService/floorMap";
import {FloorMapService} from "../../floorMapService/floorMap-service";
import {MapViewerComponent} from "../../map3-dviewer/map-viewer/map-viewer.component";
import Building from "../../buildingService/building";
import MazeService from "../../Thumb_Raiser/maze"
import { MatDialog } from '@angular/material/dialog';
import {FloorListDialogComponent} from "./floor-listDialog.component";
@Component({
  selector: 'pp-select-floor-',
  templateUrl: './floor-selection.component.html',
  styleUrls: ['./floor-selection.component.css']
})
export class SelectFloorComponent implements OnInit {

  selectedBuilding: any;
  buildings: Building[] = [];
  floors: Floor[] = [];
  selectedFloor: any;

  constructor(private floorService: FloorService, private dialog: MatDialog, private snackBar: MatSnackBar,  private floorMapService: FloorMapService, private mapViewer: MapViewerComponent, private mazeService: MazeService) {}

  ngOnInit() {
    // Lógica para obter a lista de edifícios (buildings)
    // Pode ser uma chamada ao serviço ou qualquer outra lógica necessária
    // this.selectedBuilding = ...;

    // Obtém a lista de andares associados ao edifício selecionado
    this.floorService.getFloorsFromBuilding(this.selectedBuilding.id).subscribe((floors) => {
      this.floors = floors;
    });
  }


    onBuildingChange() {
        this.floors = [];
        this.floorService.getFloorsFromBuilding(this.selectedBuilding).subscribe((floors: any) => {
            this.floors = floors;
        });
    }

    private floorViewer: any;
    private isDefault: boolean = true;

    onFloorChange() {
        this.isDefault = false;
        if(this.floorViewer != undefined) {
            this.floorMapService.getFloorMap(this.selectedFloor).subscribe((floorMap: FloorMap) => {
                this.mapViewer.cleanup();
                this.mapViewer.createFloorViewer(floorMap.fileUrl);
            });
        } else {
            this.floorMapService.getFloorMap(this.selectedFloor).subscribe((floorMap: FloorMap) => {
                this.mapViewer.createFloorViewer(floorMap.fileUrl);
            });
        }
    }

  closeForm () {
    this.floorService.closeForm();
  }

    onSubmit() {
        if (this.mazeService.collisionC) {

            this.openFloorListDialog();


                this.snackBar.open('Colisão detectada!', 'Fechar', {
                    duration: 3000,
                });
            } else {
                // Lógica para lidar com a seleção do andar
                console.log('Selected Floor:', this.selectedFloor);
            }
    }

    checkForCollision() {
        if (this.mazeService.collisionC) {
            this.openFloorListDialog();
        }
    }

    openFloorListDialog() {
        this.dialog.open(FloorListDialogComponent, {
            width: '250px',
            data: { floors: this.floors }
        });
    }


}
