import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSystemUserComponent } from './remove-systemUser.component';

describe('RemoveSystemUserComponent', () => {
    let component: RemoveSystemUserComponent;
    let fixture: ComponentFixture<RemoveSystemUserComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RemoveSystemUserComponent]
        });
        fixture = TestBed.createComponent(RemoveSystemUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it ('should create', ()=> {
        // @ts-ignore
        expect(component).toBeTruthy();
    });
});