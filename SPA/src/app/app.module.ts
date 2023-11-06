import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    CreateRobotTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
