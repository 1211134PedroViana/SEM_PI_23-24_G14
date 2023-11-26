import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CreateRobotFormComponent } from 'src/robot/create-robot-form/create-robot-form.component';
import { RobotService } from 'src/robotService/robot-service';
import { RobotTypeService } from 'src/robotTypeService/robotType-service';
import Robot from 'src/robotService/robot';
import RobotType from 'src/robotTypeService/robotType';


describe('CreateRobotFormComponent', () => {
  let component: CreateRobotFormComponent;
  let fixture: ComponentFixture<CreateRobotFormComponent>;
  let robotServiceSpy: jasmine.SpyObj<RobotService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    //Create spies for the RobotService and MatSnackBar
    robotServiceSpy = jasmine.createSpyObj('RobotService', ['addRobot', 'closeForm']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CreateRobotFormComponent],
      providers: [
        { provide: RobotService, useValue: robotServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    fixture = TestBed.createComponent(CreateRobotFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addRobot and display success message on successful form submission', fakeAsync(() => {
    //Arrange
    const mockRobotData: Robot = { domainId: '1' , id: "654e0f685a1f07a43fc69f12", code: '123', nickname: 'Test Robot', robotType: 'Test Type', serialNumber: 1, description: 'Test Description', isActive: true };

    robotServiceSpy.addRobot.and.returnValue(of(mockRobotData));

    //Act
    component.onSubmit();
    tick();

    //Assert
    expect(robotServiceSpy.addRobot).toHaveBeenCalledWith(mockRobotData);
    expect(snackBarSpy.open).toHaveBeenCalledWith(jasmine.any(String), 'Close', jasmine.any(Object));
  }));

  it('should display error message on form submission error', fakeAsync(() => {
    //Arrange
    robotServiceSpy.addRobot.and.returnValue(throwError({ status: 500 }));

    //Act
    component.onSubmit();
    tick();

    //Assert
    expect(snackBarSpy.open).toHaveBeenCalledWith('Failed to create robot, returned code:500', 'Close', jasmine.any(Object));
  }));
});
