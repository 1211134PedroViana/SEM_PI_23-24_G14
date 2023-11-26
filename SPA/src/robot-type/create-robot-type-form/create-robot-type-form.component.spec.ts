import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CreateRobotTypeFormComponent} from './create-robot-type-form.component';

describe('CreateRobotTypeFormComponent', () => {
  let component: CreateRobotTypeFormComponent;
  let fixture: ComponentFixture<CreateRobotTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRobotTypeFormComponent]
    });
    fixture = TestBed.createComponent(CreateRobotTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
