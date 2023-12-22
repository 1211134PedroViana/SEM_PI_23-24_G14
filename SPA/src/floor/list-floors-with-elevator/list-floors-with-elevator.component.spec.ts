import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListFloorsWithElevatorComponent } from './list-floors-with-elevator.component';

describe('ListFloorsWithElevatorComponent', () => {
  let component: ListFloorsWithElevatorComponent;
  let fixture: ComponentFixture<ListFloorsWithElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
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