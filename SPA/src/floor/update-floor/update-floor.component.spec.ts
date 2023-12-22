import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UpdateFloorComponent } from './update-floor.component';
import { ListFloorComponent } from '../list-floors/list-floor.component';

describe('UpdateFloorComponent', () => {
    let component: UpdateFloorComponent;
    let fixture: ComponentFixture<UpdateFloorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
            declarations: [UpdateFloorComponent, ListFloorComponent]
        });
        fixture = TestBed.createComponent(UpdateFloorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it ('should create', () => {
        expect(component).toBeTruthy();
    });
});
