import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateRobotFormComponent } from './create-robot-form.component';

describe('CreateRobotFormComponent', () => {
  let component: CreateRobotFormComponent;
  let fixture: ComponentFixture<CreateRobotFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateRobotFormComponent]
    });
    fixture = TestBed.createComponent(CreateRobotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
