import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListElevatorComponent } from './list-elevator.component';

describe('ListElevatorsComponent', () => {
  let component: ListElevatorComponent;
  let fixture: ComponentFixture<ListElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ListElevatorComponent]
    });
    fixture = TestBed.createComponent(ListElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
