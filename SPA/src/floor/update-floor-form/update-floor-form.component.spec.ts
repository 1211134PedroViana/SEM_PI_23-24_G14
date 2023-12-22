import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UpdateFloorFormComponent } from './update-floor-form.component';

describe('UpdateFloorFormComponent', () => {
    let component: UpdateFloorFormComponent;
    let fixture: ComponentFixture<UpdateFloorFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatSnackBarModule, FormsModule],
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