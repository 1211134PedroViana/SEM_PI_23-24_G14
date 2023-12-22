import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { DeactivateRobotComponent } from './deactivate-robot.component';

describe('DeactivateRobotComponent', () => {
  let component: DeactivateRobotComponent;
  let fixture: ComponentFixture<DeactivateRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [DeactivateRobotComponent]
    });
    fixture = TestBed.createComponent(DeactivateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
