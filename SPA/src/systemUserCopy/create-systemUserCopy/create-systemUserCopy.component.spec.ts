import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateSystemUserCopyComponent } from './create-systemUserCopy.component';
import { CreateSystemUserCopyFormComponent } from '../create-systemUserCopy-form/create-systemUserCopy-form.component';

describe('CreateSystemUserCopyComponent', () => {
    let component: CreateSystemUserCopyComponent;
    let fixture: ComponentFixture<CreateSystemUserCopyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatSnackBarModule, FormsModule],
            declarations: [CreateSystemUserCopyComponent, CreateSystemUserCopyFormComponent]
        });
        fixture = TestBed.createComponent(CreateSystemUserCopyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // @ts-ignore
        expect(component).toBeTruthy();
    });
});