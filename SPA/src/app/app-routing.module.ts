import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from 'src/building/building.component';
import { CreateBuildingComponent } from 'src/create-building/create-building.component';
import { CreateFloorFormComponent } from 'src/create-floor-form/create-floor-form.component';
import { CreatePassageFormComponent } from 'src/create-passage-form/create-passage-form.component';
import { FeaturesComponent } from 'src/features/features.component';
import { FloorComponent } from 'src/floor/floor.component';
import { ListBuildingsComponent } from 'src/list-buildings/list-buildings.component';
import { PassageComponent } from 'src/passage/passage.component';
import { UpdateBuildingComponent } from 'src/update-building/update-building.component';

const routes: Routes = [

  { path: 'building', component: BuildingComponent, children: [
    { path: 'create', component: CreateBuildingComponent },
    { path: 'update', component: UpdateBuildingComponent },
    { path: 'list', component: ListBuildingsComponent }
  ]},

  { path: 'floor', component: FloorComponent, children: [
    { path: 'create', component: CreateFloorFormComponent }
  ]},

  { path: 'passage', component: PassageComponent, children: [
    { path: 'create', component: CreatePassageFormComponent }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
