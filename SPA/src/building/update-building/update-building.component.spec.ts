import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UpdateBuildingComponent } from './update-building.component';
import { ListBuildingsComponent } from '../list-buildings/list-buildings.component';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [UpdateBuildingComponent, ListBuildingsComponent]
    });
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
