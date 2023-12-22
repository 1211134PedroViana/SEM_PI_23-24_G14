import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UpdateElevatorFormComponent } from './update-elevator-form.component';

describe('UpdateElevatorFormComponent', () => {
  let component: UpdateElevatorFormComponent;
  let fixture: ComponentFixture<UpdateElevatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [UpdateElevatorFormComponent]
    });
    fixture = TestBed.createComponent(UpdateElevatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
