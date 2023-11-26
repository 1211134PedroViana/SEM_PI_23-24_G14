import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import {CreateElevatorFormComponent} from "../../src/elevator/create-elevator-form/create-elevator-form.component";
import {ElevatorService} from "../../src/elevatorService/elevator.service";
import {BuildingService} from "../../src/buildingService/building.service";

describe('CreateElevatorFormComponent', () => {
  let component: CreateElevatorFormComponent;
  let fixture: ComponentFixture<CreateElevatorFormComponent>;
  let elevatorServiceSpy: jasmine.SpyObj<ElevatorService>;
  let buildingServiceSpy: jasmine.SpyObj<BuildingService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    elevatorServiceSpy = jasmine.createSpyObj('ElevatorService', ['addElevator', 'closeForm']);
    buildingServiceSpy = jasmine.createSpyObj('BuildingService', ['getAllBuildings']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CreateElevatorFormComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ElevatorService, useValue: elevatorServiceSpy },
        { provide: BuildingService, useValue: buildingServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateElevatorFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the form', () => {
    component.closeForm();
    expect(elevatorServiceSpy.closeForm).toHaveBeenCalled();
  });

  it('should submit elevator data successfully', () => {
    const mockElevatorData: {
      floorList: string[];
      code: string;
      serialNumber: string;
      description: string;
      location: { positionY: number; positionX: number; direction: string };
      model: string;
      brand: string;
      buildingId: string
    } = {
      code: 'mockCode',
      location:{
        positionX: 1,
        positionY: 1,
        direction: 'north',
      },
      buildingId: 'mockBuildingId',
      floorList: ['1'],
      brand: 'mockBrand',
      model: 'mockModel',
      serialNumber: 'mockSerialNumber',
      description: 'mockDescription'
    };

    // @ts-ignore
    elevatorServiceSpy.addElevator.and.returnValue(of(mockElevatorData));

    component.code = 'mockCode';
    component.positionX = 0;
    component.positionY = 0;
    component.direction = 'mockDirection';
    component.buildingId = 'mockBuildingId';
    component.floorList = 'floor1, floor2';
    component.brand = 'mockBrand';
    component.model = 'mockModel';
    component.serialNumber = 'mockSerialNumber';
    component.description = 'mockDescription';

    component.onSubmit();

    expect(elevatorServiceSpy.addElevator).toHaveBeenCalledWith({
      id:"1234",
      code: 'mockCode',
      location: {
        positionX: 0,
        positionY: 0,
        direction: 'mockDirection'
      },
      buildingId: 'mockBuildingId',
      floorList: ['floor1', 'floor2'],
      brand: 'mockBrand',
      model: 'mockModel',
      serialNumber: 'mockSerialNumber',
      description: 'mockDescription'
    });
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Elevator created successfully! | Code: mockCode | Brand: mockBrand | Description: mockDescription',
      'Close',
      { duration: 5000 }
    );
  });

  // Add more test cases as needed
});
