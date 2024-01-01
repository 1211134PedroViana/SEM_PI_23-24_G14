// floor-list-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Floor from 'src/floorService/floor';
import Building from "../../buildingService/building";
import FloorMap from "../../floorMapService/floorMap";
import {FloorMapService} from "../../floorMapService/floorMap-service";
import {MapViewerComponent} from "../../map3-dviewer/map-viewer/map-viewer.component";

@Component({
    selector: 'app-floor-list-dialog',
    template: `
        <h2>Escolha um Andar</h2>
        <div *ngIf="data.selectedBuilding" class="dropdown">
            <label for="floor">Andar:</label>
            <select class="form-select" id="floor" [(ngModel)]="selectedFloor" (change)="onFloorChange()">
                <option *ngFor="let floor of data.floors" [value]="floor.id">{{ floor.floorNumber }}</option>
            </select>
        </div>
    `
})
export class FloorListDialogComponent {
    selectedFloor: any;
    selectedBuilding: any;
    buildings: Building[] = [];
    floors: Floor[] = [];


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { floors: Floor[], selectedBuilding: Building },
        private floorMapService: FloorMapService,
        private mapViewer: MapViewerComponent // Supondo que você tenha um serviço para isso
    ) {}

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
}
