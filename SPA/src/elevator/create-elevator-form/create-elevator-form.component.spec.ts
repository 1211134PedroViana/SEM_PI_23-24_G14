import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CreateElevatorFormComponent} from './create-elevator-form.component';

describe('CreateElevatorFormComponent', () => {
  let component: CreateElevatorFormComponent;
  let fixture: ComponentFixture<CreateElevatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
