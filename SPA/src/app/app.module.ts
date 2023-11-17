import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampusSideBarComponent } from '../campus-side-bar/campus-side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BuildingComponent } from '../building/building.component';
import { FloorComponent } from '../floor/floor.component';
import { PassageComponent } from '../passage/passage.component';
import { CreateBuildingComponent } from '../building/create-building/create-building.component';
import { UpdateBuildingComponent } from '../building/update-building/update-building.component';
import { ListBuildingsComponent } from '../building/list-buildings/list-buildings.component';
import { CreateBuildingFormComponent } from '../building/create-building-form/create-building-form.component';
import { FeaturesComponent } from '../features/features.component';
import { UpdateBuildingFormComponent } from '../building/update-building-form/update-building-form.component';
import { CreateFloorFormComponent } from '../floor/create-floor-form/create-floor-form.component';
import { CreatePassageFormComponent } from '../passage/create-passage-form/create-passage-form.component';
import { FleetSideBarComponent } from '../fleet-side-bar/fleet-side-bar.component';
import { RobotTypeComponent } from '../robot-type/robot-type.component';
import { CreateRobotTypeComponent } from '../robot-type/create-robot-type/create-robot-type.component';
import { Featuresv4Component } from '../featuresv4/featuresv4.component';
import { LoadFloorMapComponent } from '../load-floor-map/load-floor-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MapViewerComponent } from '../map-viewer/map-viewer.component';
import { RobotComponent } from 'src/robot/robot.component';
import { CreateRobotComponent } from 'src/robot/create-robot/create-robot.component';
import { CreateRobotFormComponent } from 'src/robot/create-robot-form/create-robot-form.component';
import { CreateElevatorComponent } from '../elevator/create-elevator/create-elevator.component';
import {ElevatorComponent} from "../elevator/elevator.component";
import {CreateElevatorFormComponent} from "../elevator/create-elevator-form/create-elevator-form.component";
import {UpdateElevatorComponent} from "../elevator/update-elevator/update-elevator.component";
import {ListElevatorComponent} from "../elevator/list-elevators/list-elevator.component";
import {UpdateElevatorFormComponent} from "../elevator/update-elevator-form/update-elevator-form.component";
import {ListPassageComponent} from "../passage/list-passages/list-passage.component";
import { AppCampusComponent } from '../app-campus/app-campus.component';
import { AppFleetComponent } from '../app-fleet/app-fleet.component';

@NgModule({
  declarations: [
    AppComponent,
    CampusSideBarComponent,
    NavbarComponent,
    BuildingComponent,
    FloorComponent,
    PassageComponent,
    CreateBuildingComponent,
    UpdateBuildingComponent,
    ListBuildingsComponent,
    CreateBuildingFormComponent,
    FeaturesComponent,
    UpdateBuildingFormComponent,
    CreateFloorFormComponent,
    CreatePassageFormComponent,
    FleetSideBarComponent,
    RobotTypeComponent,
    CreateRobotTypeComponent,
    RobotComponent,
    CreateRobotComponent,
    CreateRobotFormComponent,
    Featuresv4Component,
    LoadFloorMapComponent,
    SignInComponent,
    MapViewerComponent,
    ElevatorComponent,
    CreateElevatorComponent,
    CreateElevatorFormComponent,
    UpdateElevatorComponent,
    ListElevatorComponent,
    UpdateElevatorFormComponent,
    ListPassageComponent,
    AppCampusComponent,
    AppFleetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
