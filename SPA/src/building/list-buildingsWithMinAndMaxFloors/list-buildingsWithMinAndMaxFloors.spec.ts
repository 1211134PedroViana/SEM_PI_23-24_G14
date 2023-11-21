import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsWithMinAndMaxFloorsComponent } from './list-buildingsWithMinAndMaxFloors';

describe('ListBuildingsWithMinAndMaxFloors', () => {
    let component: ListBuildingsWithMinAndMaxFloorsComponent;
    let fixture: ComponentFixture<ListBuildingsWithMinAndMaxFloorsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListBuildingsWithMinAndMaxFloorsComponent]
        });
        fixture = TestBed.createComponent(ListBuildingsWithMinAndMaxFloorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});