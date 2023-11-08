import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from 'src/building/building.component';
import { CreateBuildingComponent } from 'src/building/create-building/create-building.component';
import { CreateFloorFormComponent } from 'src/floor/create-floor-form/create-floor-form.component';
import { CreatePassageFormComponent } from 'src/passage/create-passage-form/create-passage-form.component';
import { FeaturesComponent } from 'src/features/features.component';
import { FloorComponent } from 'src/floor/floor.component';
import { ListBuildingsComponent } from 'src/building/list-buildings/list-buildings.component';
import { PassageComponent } from 'src/passage/passage.component';
import { UpdateBuildingComponent } from 'src/building/update-building/update-building.component';
import { RobotTypeComponent } from 'src/robot-type/robot-type.component';
import { CreateRobotTypeComponent } from 'src/robot-type/create-robot-type/create-robot-type.component';
import { LoadFloorMapComponent } from 'src/load-floor-map/load-floor-map.component';
import { MapViewerComponent } from 'src/map-viewer/map-viewer.component';

const routes: Routes = [

  { path: 'building', component: BuildingComponent, children: [
    { path: 'create', component: CreateBuildingComponent },
    { path: 'update', component: UpdateBuildingComponent },
    { path: 'list', component: ListBuildingsComponent }
  ]},

  { path: 'floor', component: FloorComponent, children: [
    { path: 'create', component: CreateFloorFormComponent },
    { path: 'loadMap', component: LoadFloorMapComponent }
  ]},

  { path: 'passage', component: PassageComponent, children: [
    { path: 'create', component: CreatePassageFormComponent }
  ]},

  { path: 'robotType', component: RobotTypeComponent, children: [
    { path: 'create', component: CreateRobotTypeComponent }
  ]},

  { path: 'floor3DViewer', component: MapViewerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
