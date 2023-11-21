import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFloorsFromABuildingComponent } from './list-floorsFromABuilding.component';

describe('ListFloorsFromABuilding', () => {
    let component: ListFloorsFromABuildingComponent;
    let fixture: ComponentFixture<ListFloorsFromABuildingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListFloorsFromABuildingComponent]
        });
        fixture = TestBed.createComponent(ListFloorsFromABuildingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});