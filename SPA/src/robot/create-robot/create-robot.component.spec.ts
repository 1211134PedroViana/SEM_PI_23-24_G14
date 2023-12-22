import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateRobotComponent } from './create-robot.component';
import { CreateRobotFormComponent } from '../create-robot-form/create-robot-form.component';

describe('CreateRobotComponent', () => {
  let component: CreateRobotComponent;
  let fixture: ComponentFixture<CreateRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateRobotComponent, CreateRobotFormComponent]
    });
    fixture = TestBed.createComponent(CreateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
