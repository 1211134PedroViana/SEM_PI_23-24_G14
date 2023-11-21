import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithElevatorComponent } from './list-floorsWithElevator.component';

describe('ListFloorsWithElevatorComponent', () => {
  let component: ListFloorsWithElevatorComponent;
  let fixture: ComponentFixture<ListFloorsWithElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsWithElevatorComponent]
    });
    fixture = TestBed.createComponent(ListFloorsWithElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});