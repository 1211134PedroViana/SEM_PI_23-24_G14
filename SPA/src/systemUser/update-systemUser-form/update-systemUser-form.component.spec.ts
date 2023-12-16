import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSystemUserFormComponent } from './update-systemUser-form.component';

describe('UpdateSystemUserFormComponent', () => {
    let component: UpdateSystemUserFormComponent;
    let fixture: ComponentFixture<UpdateSystemUserFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateSystemUserFormComponent]
        });
        fixture = TestBed.createComponent(UpdateSystemUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});