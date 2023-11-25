import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from 'src/building/building.component';
import { CreateBuildingComponent } from 'src/building/create-building/create-building.component';
import { CreateFloorFormComponent } from 'src/floor/create-floor-form/create-floor-form.component';
import { CreatePassageFormComponent } from 'src/passage/create-passage-form/create-passage-form.component';
import { FloorComponent } from 'src/floor/floor.component';
import { ListBuildingsComponent } from 'src/building/list-buildings/list-buildings.component';
import { ListBuildingsWithMinAndMaxFloorsComponent } from 'src/building/list-buildingsWithMinAndMaxFloors/list-buildingsWithMinAndMaxFloors';
import { PassageComponent } from 'src/passage/passage.component';
import { UpdateBuildingComponent } from 'src/building/update-building/update-building.component';
import { UpdateFloorComponent } from 'src/floor/update-floor/update-floor.component';
import { RobotTypeComponent } from 'src/robot-type/robot-type.component';
import { CreateRobotTypeComponent } from 'src/robot-type/create-robot-type/create-robot-type.component';
import { LoadFloorMapComponent } from 'src/load-floor-map/load-floor-map.component';
import { MapViewerComponent } from 'src/map-viewer/map-viewer.component';
import { CreateRobotComponent } from 'src/robot/create-robot/create-robot.component';
import { RobotComponent } from 'src/robot/robot.component';
import {ElevatorComponent} from "../elevator/elevator.component";
import {CreateElevatorFormComponent} from "../elevator/create-elevator-form/create-elevator-form.component";
import {UpdateElevatorComponent} from "../elevator/update-elevator/update-elevator.component";
import {ListElevatorComponent} from "../elevator/list-elevators/list-elevator.component";
import {ListPassageComponent} from "../passage/list-passages/list-passage.component";
import { AppCampusComponent } from 'src/app-campus/app-campus.component';
import { AppFleetComponent } from 'src/app-fleet/app-fleet.component';
import {RoomComponent} from "../room/room.component";
import {CreateRoomFormComponent} from "../room/create-room-form/create-room-form.component";
import { DeactivateRobotComponent } from 'src/robot/deactivate-robot/deactivate-robot.component';
import {ListRobotsComponent} from "../robot/list-robots/list-robots.component";
import { ListFloorsWithElevatorComponent } from 'src/floor/list-floorsWithElevators/list-floorsWithElevator.component';
import { ListFloorsWithPassagesComponent} from 'src/floor/list-floors-with-passages/list-floors-with-passages.component'
import {CreateElevatorComponent} from "../elevator/create-elevator/create-elevator.component";
import { ListFloorsFromABuildingComponent } from 'src/floor/list-floors-with-passages/list-floorsFromBuilding/list-floorsFromABuilding.component';
import {CreatePassageComponent} from "../passage/create-passage/create-passage.component";
import {UpdatePassageComponent} from "../passage/update-passage/update-passage.component";
import {ListFloorComponent} from "../floor/list-floors/list-floor.component";

const routes: Routes = [

  //Campus Manager App
  { path: 'campus', component: AppCampusComponent, children: [
    { path: 'building', component: BuildingComponent, children: [
      { path: 'create', component: CreateBuildingComponent },
      { path: 'update', component: UpdateBuildingComponent },
      { path: 'list', component: ListBuildingsComponent },
      { path: 'listBuildingsWithMinAndMaxFloors', component: ListBuildingsWithMinAndMaxFloorsComponent }
    ]},
    { path: 'floor', component: FloorComponent, children: [
      { path: 'create', component: CreateFloorFormComponent },
      { path: 'update', component: UpdateFloorComponent },
      { path: 'list', component: ListFloorComponent },
      { path: 'listFromABuilding', component: ListFloorsFromABuildingComponent },
      { path: 'loadMap', component: LoadFloorMapComponent },
      { path: 'listFloorsWithElevator', component: ListFloorsWithElevatorComponent},
      { path: 'listFloorsWithPassages', component: ListFloorsWithPassagesComponent }
    ]},
    { path: 'room', component: RoomComponent, children: [
      { path: 'create', component: CreateRoomFormComponent },
    ]},
    { path: 'passage', component: PassageComponent, children: [
      { path: 'create', component: CreatePassageComponent },
      { path: 'update', component: UpdatePassageComponent},
      { path: 'list', component: ListPassageComponent}
    ]},
    { path: 'elevator', component: ElevatorComponent, children: [
      { path: 'create', component: CreateElevatorComponent},
      { path: 'update', component: UpdateElevatorComponent},
      { path: 'list', component: ListElevatorComponent}
    ]},
    { path: 'floor3DViewer', component: MapViewerComponent }
  ]},

  //Fleet Manager App
  { path: 'fleet', component: AppFleetComponent, children: [
    { path: 'robotType', component: RobotTypeComponent, children: [
      { path: 'create', component: CreateRobotTypeComponent }
    ]},
    { path: 'robot', component: RobotComponent, children: [
      { path: 'create', component: CreateRobotComponent },
      { path: 'deactivate', component: DeactivateRobotComponent },
      { path: 'list', component: ListRobotsComponent }
      ]},
    { path: 'floor3DViewer', component: MapViewerComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
