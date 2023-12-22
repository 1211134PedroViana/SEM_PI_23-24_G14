import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateBuildingComponent } from './create-building.component';
import { CreateBuildingFormComponent } from '../create-building-form/create-building-form.component';

describe('CreateBuildingComponent', () => {
  let component: CreateBuildingComponent;
  let fixture: ComponentFixture<CreateBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateBuildingComponent, CreateBuildingFormComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
