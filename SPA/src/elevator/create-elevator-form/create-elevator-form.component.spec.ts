import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import {CreateElevatorFormComponent} from './create-elevator-form.component';

describe('CreateElevatorFormComponent', () => {
  let component: CreateElevatorFormComponent;
  let fixture: ComponentFixture<CreateElevatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateElevatorFormComponent]
    });
    fixture = TestBed.createComponent(CreateElevatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
