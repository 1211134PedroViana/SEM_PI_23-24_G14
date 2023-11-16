import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElevatorFormComponent } from './update-elevator-form.component';

describe('UpdateElevatorFormComponent', () => {
  let component: UpdateElevatorFormComponent;
  let fixture: ComponentFixture<UpdateElevatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
