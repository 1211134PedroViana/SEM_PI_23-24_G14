import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from 'src/building/building.component';
import { FloorComponent } from 'src/floor/floor.component';
import { PassageComponent } from 'src/passage/passage.component';

const routes: Routes = [
  { path: 'building', component: BuildingComponent },
  { path: 'floor', component: FloorComponent },
  { path: 'passage', component: PassageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
