import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListFloorsFromABuildingComponent } from './list-floorsFromABuilding.component';

describe('ListFloorsFromABuilding', () => {
    let component: ListFloorsFromABuildingComponent;
    let fixture: ComponentFixture<ListFloorsFromABuildingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
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