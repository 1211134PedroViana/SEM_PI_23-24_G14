import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListBuildingsWithMinAndMaxFloorsComponent } from 'src/building/list-buildingsWithMinAndMaxFloors/list-buildingsWithMinAndMaxFloors';
import { BuildingService } from 'src/buildingService/building.service';
import { of } from 'rxjs';
import Building from 'src/buildingService/building';
import Floor from 'src/floorService/floor';

describe('ListBuildingsWithMinAndMaxFloorsComponent', () => {
  let component: ListBuildingsWithMinAndMaxFloorsComponent;
  let fixture: ComponentFixture<ListBuildingsWithMinAndMaxFloorsComponent>;
  let buildingServiceSpy: jasmine.SpyObj<BuildingService>;

  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('BuildingService', ['getAllBuildingsWithMinAndMaxFloors']);

    TestBed.configureTestingModule({
      declarations: [ListBuildingsWithMinAndMaxFloorsComponent],
      providers: [{ provide: BuildingService, useValue: spy }]
    });

    fixture = TestBed.createComponent(ListBuildingsWithMinAndMaxFloorsComponent);
    component = fixture.componentInstance;
    buildingServiceSpy = TestBed.inject(BuildingService) as jasmine.SpyObj<BuildingService>;
  });


  it('should load buildings with min and max floors', waitForAsync(() => {
    // Arrange
    const mockFloors: Floor[] = [
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09684', buildingId: '654e0f685a1f07a43fc69f11', floorNumber: 1, description: '"Building 1 - Floor 1'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09685', buildingId: '654e0f685a1f07a43fc69f11', floorNumber: 2, description: '"Building 1 - Floor 2'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09686', buildingId: '654e0f685a1f07a43fc69f11', floorNumber: 3, description: '"Building 1 - Floor 3'},
       
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09687', buildingId: '654e0f685a1f07a43fc69f12', floorNumber: 1, description: '"Building 2 - Floor 1'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09688', buildingId: '654e0f685a1f07a43fc69f12', floorNumber: 2, description: '"Building 2 - Floor 2'},
    
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09689', buildingId: '654e0f685a1f07a43fc69f13', floorNumber: 1, description: '"Building 3 - Floor 1'},
    
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09690', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 1, description: '"Building 4 - Floor 1'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09691', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 2, description: '"Building 4 - Floor 2'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09692', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 3, description: '"Building 4 - Floor 3'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09693', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 4, description: '"Building 4 - Floor 4'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09694', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 5, description: '"Building 4 - Floor 5'},
        { id: '219a9eb4-c2a7-49ff-ac36-828c0ad09695', buildingId: '654e0f685a1f07a43fc69f14', floorNumber: 6, description: '"Building 4 - Floor 6'},
    ];
    
    
      const mockBuildings: Building[] = [
        { id: '654e0f685a1f07a43fc69f11', code: 'BLD 1', description: '1', name: 'Building 1'},
        { id: '654e0f685a1f07a43fc69f12', code: 'BLD 2', description: '2', name: 'Building 2'},
        { id: '654e0f685a1f07a43fc69f13', code: 'BLD 3', description: '3', name: 'Building 3'},
        { id: '654e0f685a1f07a43fc69f14', code: 'BLD 4', description: '4', name: 'Building 4'},
      ];

    buildingServiceSpy.getAllBuildingsWithMinAndMaxFloors.and.returnValue(of(mockBuildings));

    // Act
    component.min = 1;
    component.max = 5;
    component.loadBuildings();

    // Assert
    fixture.whenStable().then(() => {
      expect(component.buildings).toEqual(mockBuildings);
    });
  }));
});
