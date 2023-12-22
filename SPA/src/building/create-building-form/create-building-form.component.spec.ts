import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateBuildingFormComponent } from './create-building-form.component';

describe('CreateBuildingFormComponent', () => {
  let component: CreateBuildingFormComponent;
  let fixture: ComponentFixture<CreateBuildingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateBuildingFormComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
