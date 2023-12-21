import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSystemUserFormComponent } from './remove-systemUser-form.component';

describe('RemoveSystemUserFormComponent', () => {
    let component: RemoveSystemUserFormComponent;
    let fixture: ComponentFixture<RemoveSystemUserFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RemoveSystemUserFormComponent]
        });
        fixture = TestBed.createComponent(RemoveSystemUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});