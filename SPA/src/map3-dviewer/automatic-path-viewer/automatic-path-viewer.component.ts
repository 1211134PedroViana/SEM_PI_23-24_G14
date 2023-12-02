import { Component, Input } from '@angular/core';
import { ElevatorService } from 'src/elevatorService/elevator.service';
import FloorMap from 'src/floorMapService/floorMap';
import { FloorMapService } from 'src/floorMapService/floorMap-service';
import { FloorService } from 'src/floorService/floor-service';
import { PassageService } from 'src/passageService/passage.service';
import Room from 'src/roomService/room';
import Location from 'src/roomService/location';
import { RoomService } from 'src/roomService/room.service';

@Component({
  selector: 'app-automatic-path-viewer',
  templateUrl: './automatic-path-viewer.component.html',
  styleUrls: ['./automatic-path-viewer.component.css']
})

export class AutomaticPathViewerComponent {

  @Input() path: string[] = [];
  @Input() cellsPath: string[][] = [];

  locations: Location[] = [];
  cells: string[] = [];

  constructor(private floorMapService: FloorMapService, private passageService: PassageService, private floorService: FloorService, 
    private roomService: RoomService, private elevatorService: ElevatorService) { }

  ngOnInit() {
    for(let i = 0; i < this.path.length - 1; i++) {
      
      this.roomService.getRoomByDescription(this.path[i]).subscribe((fromRoom: Room) => {
        this.locations.push(fromRoom.location);

        this.roomService.getRoomByDescription(this.path[i+1]).subscribe((toRoom: Room) => {
          this.locations.push(toRoom.location);

          this.floorMapService.getFloorMap(fromRoom.floorId).subscribe((map: FloorMap) => {
            this.loadFloorMap(map.fileUrl);

          });
        });
      });
    }
  }

  loadFloorMap(mapurl: string) {

  }
}
