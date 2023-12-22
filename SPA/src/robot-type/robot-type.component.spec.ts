import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RobotTypeComponent } from './robot-type.component';

describe('RobotTypeComponent', () => {
  let component: RobotTypeComponent;
  let fixture: ComponentFixture<RobotTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RobotTypeComponent]
    });
    fixture = TestBed.createComponent(RobotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
