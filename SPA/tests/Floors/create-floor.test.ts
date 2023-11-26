import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateFloorComponent } from 'src/floor/create-floor/create-floor.component';
import { CreateFloorFormComponent } from 'src/floor/create-floor-form/create-floor-form.component';
import { FloorService } from 'src/floorService/floor-service';
import { BuildingService } from 'src/buildingService/building.service';
import { of, throwError } from 'rxjs';
import Building from 'src/buildingService/building';
import Floor from 'src/floorService/floor';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateFloorFormComponent', () => {
  let component: CreateFloorFormComponent;
  let fixture: ComponentFixture<CreateFloorFormComponent>;
  let mockFloorService: jasmine.SpyObj<FloorService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockFloorService = jasmine.createSpyObj('FloorService', ['createFloor']);
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getAllBuildings']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CreateFloorFormComponent],
      providers: [
        { provide: FloorService, useValue: mockFloorService },
        { provide: BuildingService, useValue: mockBuildingService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ],
      imports: [ReactiveFormsModule]  //Import necessary modules, such as ReactiveFormsModule for working with forms
    });

    fixture = TestBed.createComponent(CreateFloorFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method on form submission', fakeAsync(() => {
    //Arrange
    const mockFloorData: Floor = {
      id: '1',
      buildingId: 'building1',
      floorNumber: 1,
      description: 'Test Floor'
    };

    mockFloorService.createFloor.and.returnValue(of(mockFloorData));
    mockBuildingService.getAllBuildings.and.returnValue(of([]));

    //Set form values
    component.buildingId = mockFloorData.buildingId;
    component.floorNumber = mockFloorData.floorNumber;
    component.description = mockFloorData.description;

    //Act
    component.onSubmit();
    tick();  //Simulate the passage of time to wait for observable to complete

    //Assert
    expect(mockFloorService.createFloor).toHaveBeenCalledWith(mockFloorData);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      `Floor created successfully! | Number: ${mockFloorData.floorNumber} | Description: ${mockFloorData.description}`,
      'Close',
      { duration: 5000 }
    );
  }));

  it('should handle error on form submission', fakeAsync(() => {
    //Arrange
    const errorMessage = 'Error creating floor';
    const errorResponse = { status: 500 };
    mockFloorService.createFloor.and.returnValue(throwError(errorResponse));
    mockBuildingService.getAllBuildings.and.returnValue(of([]));

    //Set form values
    component.buildingId = 'building1';
    component.floorNumber = 1;
    component.description = 'Test Floor';

    //Act
    component.onSubmit();
    tick();

    //Assert
    expect(mockFloorService.createFloor).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith(`Failed to create floor, returned code: ${errorResponse.status}`, 'Close', { duration: 5000 });
  }));
});
