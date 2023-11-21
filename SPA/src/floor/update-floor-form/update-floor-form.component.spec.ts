import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFloorFormComponent } from './update-floor-form.component';

describe('UpdateFloorFormComponent', () => {
    let component: UpdateFloorFormComponent;
    let fixture: ComponentFixture<UpdateFloorFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateFloorFormComponent]
        });
        fixture = TestBed.createComponent(UpdateFloorFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});