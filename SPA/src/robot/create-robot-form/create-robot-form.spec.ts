import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRobotFormComponent } from './create-robot-form.component';

describe('CreateRobotFormComponent', () => {
  let component: CreateRobotFormComponent;
  let fixture: ComponentFixture<CreateRobotFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
