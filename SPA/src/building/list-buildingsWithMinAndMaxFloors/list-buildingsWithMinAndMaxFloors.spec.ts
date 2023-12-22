import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListBuildingsWithMinAndMaxFloorsComponent } from './list-buildingsWithMinAndMaxFloors';

describe('ListBuildingsWithMinAndMaxFloors', () => {
    let component: ListBuildingsWithMinAndMaxFloorsComponent;
    let fixture: ComponentFixture<ListBuildingsWithMinAndMaxFloorsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
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