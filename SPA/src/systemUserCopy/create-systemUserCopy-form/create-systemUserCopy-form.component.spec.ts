import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateSystemUserCopyComponent } from '../create-systemUserCopy/create-systemUserCopy.component';
import { CreateSystemUserCopyFormComponent } from './create-systemUserCopy-form.component';

describe('CreateSystemUserCopyComponent', () => {
    let component: CreateSystemUserCopyFormComponent;
    let fixture: ComponentFixture<CreateSystemUserCopyFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatSnackBarModule, FormsModule],
            declarations: [CreateSystemUserCopyComponent]
        });
        fixture = TestBed.createComponent(CreateSystemUserCopyFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});