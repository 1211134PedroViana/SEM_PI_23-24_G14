import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfigService } from '../config.service';
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
import { MapViewerComponent } from '../map3-dviewer/map-viewer/map-viewer.component';
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
import {CreateRoomFormComponent} from "../room/create-room-form/create-room-form.component";
import {CreateRoomComponent} from "../room/create-room/create-room.component";
import {RoomComponent} from "../room/room.component";
import { DeactivateRobotComponent } from '../robot/deactivate-robot/deactivate-robot.component';
import {ListRobotsComponent} from "../robot/list-robots/list-robots.component";
import { UpdateFloorComponent } from 'src/floor/update-floor/update-floor.component';
import { UpdateFloorFormComponent } from 'src/floor/update-floor-form/update-floor-form.component';
import { ListFloorsWithPassagesComponent } from 'src/floor/list-floors-with-passages/list-floors-with-passages.component';
import { Featuresv6Component } from '../featuresv6/featuresv6.component';
import { ListBuildingsWithMinAndMaxFloorsComponent } from 'src/building/list-buildingsWithMinAndMaxFloors/list-buildingsWithMinAndMaxFloors';
import { ListFloorsFromABuildingComponent } from 'src/floor/list-floors-with-passages/list-floorsFromBuilding/list-floorsFromABuilding.component';
import {CreatePassageComponent} from "../passage/create-passage/create-passage.component";
import { UpdatePassageComponent} from "../passage/update-passage/update-passage.component";
import { UpdatePassageFormComponent} from "../passage/update-passage-form/update-passage-form.component";
import {ListFloorComponent} from "../floor/list-floors/list-floor.component";
import {ListFloorsWithElevatorComponent} from "../floor/list-floors-with-elevator/list-floors-with-elevator.component";
import {CreateFloorComponent} from "../floor/create-floor/create-floor.component";
import {ListRobotsDesignationComponent} from "../robot/list-robotsDesignation/list-robotsDesignation.component";
import { AppTaskComponent } from '../app-task/app-task.component';
import { TaskSideBarComponent } from '../task-side-bar/task-side-bar.component';
import { ComputePathComponent } from '../compute-path/compute-path.component';
import { MapViewerFeaturesComponent } from '../map3-dviewer/map-viewer-features/map-viewer-features.component';
import { Map3DViewerComponent } from '../map3-dviewer/map3-dviewer.component';
import { AutomaticPathViewerComponent } from '../map3-dviewer/automatic-path-viewer/automatic-path-viewer.component';
import { PathFormComponent } from '../map3-dviewer/path-form/path-form.component';
import {AppAdminComponent} from "../app-admin/app-admin.component";
import {AdminSideBarComponent} from "../admin-side-bar/admin-side-bar.component";
import {SystemUserComponent} from "../systemUser/systemUser.component";
import {CreateSystemUserComponent} from "../systemUser/create-systemUser/create-systemUser.component";
import {CreateSystemUserFormComponent} from "../systemUser/create-systemUser-form/create-systemUser-form.component";
import { AppUserComponent } from '../app-user/app-user.component';
import { UserSideBarComponent } from '../user-side-bar/user-side-bar.component';
import { TaskComponent } from '../task/task.component';
import { RequestTaskComponent } from '../task/request-task/request-task.component';
import { PickupDeliveryTaskFormComponent } from '../task/pickup-delivery-task-form/pickup-delivery-task-form.component';
import { SurveillanceTaskFormComponent } from 'src/task/surveillance-task-form/surveillance-task-form.component';
import { SearchTaskComponent } from '../search-task/search-task.component';
import { TaskByStatusComponent } from '../search-task/task-by-status/task-by-status.component';
import { TaskByTypeComponent } from '../search-task/task-by-type/task-by-type.component';
import { TaskByUserComponent } from '../search-task/task-by-user/task-by-user.component';
import { CreateRegisterComponent } from '../register/create-register/create-register.component';
import {ApproveDenyTaskComponent} from "../approve-deny-task/approve-deny-task.component";
import { ApproveTaskComponent } from 'src/approve-deny-task/approve-task/approve-task.component';
import { DenyTaskComponent } from 'src/approve-deny-task/deny-task/deny-task.component';
import { ApproveDenySurveillanceTasksComponent } from 'src/approve-deny-task/surveillance-tasks/surveillance-tasks.component';
import { ApproveDenyPickupDeliveryTasksComponent } from 'src/approve-deny-task/pickup-delivery-tasks/pickup-delivery-tasks.component';
import { ApproveDenySurveillanceTaskFormComponent } from 'src/approve-deny-task/surveillance-tasks-form/surveillance-tasks-form.component';
import { ApproveDenyPickupDeliveryTaskFormComponent } from 'src/approve-deny-task/pickup-delivery-tasks-form/pickup-delivery-tasks-form.component';
import {RegisterComponent} from "../register/register.component";
import { UpdateSystemUserComponent } from 'src/systemUser/update-systemUser/update-systemUser.component';
import { UpdateSystemUserFormComponent } from 'src/systemUser/update-systemUser-form/update-systemUser-form.component';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import {ListNotApprovedSurTaskComponent} from "../notApproved/list-notApprovedSurTasks/list-notApprovedSurTask.component";
import {NotApprovedComponent} from "../notApproved/notApproved.component";
import {
  ListNotApprovedPicTaskComponent
} from "../notApproved/list-notApprovedPicTasks/list-notApprovedPicTask.component";
import { RemoveSystemUserComponent } from 'src/systemUser/remove-systemUser/remove-systemUser.component';
import { RemoveSystemUserFormComponent } from 'src/systemUser/remove-systemUser-form/remove-systemUser-form.component';
import { CreateSystemUserCopyComponent } from 'src/systemUserCopy/create-systemUserCopy/create-systemUserCopy.component';
import { CreateSystemUserCopyFormComponent } from 'src/systemUserCopy/create-systemUserCopy-form/create-systemUserCopy-form.component';
import { TaskSequenceComponent } from '../task/task-sequence/task-sequence.component';
import { ListSystemUserCopyComponent } from 'src/systemUserCopy/list-systemUserCopy/list-systemUserCopy.component';
import {SelectFloorComponent} from "../floor/floor-selection/floor-selection.component";
import {FloorListDialogComponent} from "../floor/floor-selection/floor-listDialog.component";

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
    UpdateFloorComponent,
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
    AppFleetComponent,
    CreateRoomComponent,
    CreateRoomFormComponent,
    RoomComponent,
    DeactivateRobotComponent,
    ListRobotsComponent,
    ListFloorsFromABuildingComponent,
    UpdateFloorFormComponent,
    ListFloorsWithPassagesComponent,
    ListBuildingsWithMinAndMaxFloorsComponent,
    Featuresv6Component,
    CreatePassageComponent,
    UpdatePassageComponent,
    UpdatePassageFormComponent,
    ListFloorComponent,
    ListFloorsWithElevatorComponent,
    CreateFloorComponent,
    ListRobotsDesignationComponent,
    AppTaskComponent,
    TaskSideBarComponent,
    ComputePathComponent,
    MapViewerFeaturesComponent,
    Map3DViewerComponent,
    AutomaticPathViewerComponent,
    PathFormComponent,
    AppAdminComponent,
    AdminSideBarComponent,
    SystemUserComponent,
    CreateSystemUserComponent,
    CreateSystemUserFormComponent,
    AppUserComponent,
    UserSideBarComponent,
    TaskComponent,
    RequestTaskComponent,
    PickupDeliveryTaskFormComponent,
    SurveillanceTaskFormComponent,
    SearchTaskComponent,
    TaskByStatusComponent,
    TaskByTypeComponent,
    TaskByUserComponent,
    CreateRegisterComponent,
    ApproveDenyTaskComponent,
    ApproveTaskComponent,
    DenyTaskComponent,
    ApproveDenySurveillanceTasksComponent,
    ApproveDenyPickupDeliveryTasksComponent,
    ApproveDenySurveillanceTaskFormComponent,
    ApproveDenyPickupDeliveryTaskFormComponent,
    RegisterComponent,
    UpdateSystemUserComponent,
    UpdateSystemUserFormComponent,
    TermsAndConditionsComponent,
    NotApprovedComponent,
    ListNotApprovedSurTaskComponent,
    ListNotApprovedPicTaskComponent,
    RemoveSystemUserComponent,
    RemoveSystemUserFormComponent,
    CreateSystemUserCopyComponent,
    CreateSystemUserCopyFormComponent,
    TaskSequenceComponent,
    SelectFloorComponent,
    FloorListDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
