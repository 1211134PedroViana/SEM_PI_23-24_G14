import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateElevatorComponent } from './create-elevator.component';
import {CreateElevatorFormComponent} from '../create-elevator-form/create-elevator-form.component';

describe('CreateElevatorComponent', () => {
  let component: CreateElevatorComponent;
  let fixture: ComponentFixture<CreateElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateElevatorComponent, CreateElevatorFormComponent]
    });
    fixture = TestBed.createComponent(CreateElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
