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
import { CreateBuildingComponent } from '../create-building/create-building.component';
import { UpdateBuildingComponent } from '../update-building/update-building.component';
import { ListBuildingsComponent } from '../list-buildings/list-buildings.component';
import { CreateBuildingFormComponent } from '../create-building-form/create-building-form.component';
import { FeaturesComponent } from '../features/features.component';
import { UpdateBuildingFormComponent } from '../update-building-form/update-building-form.component';
import { CreateFloorFormComponent } from '../create-floor-form/create-floor-form.component';
import { CreatePassageFormComponent } from '../create-passage-form/create-passage-form.component';

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
    CreatePassageFormComponent
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
