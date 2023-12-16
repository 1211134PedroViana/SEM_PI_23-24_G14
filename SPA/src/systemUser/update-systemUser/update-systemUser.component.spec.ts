import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateSystemUserComponent } from './update-systemUser.component';

describe('UpdateSystemUserComponent', () => {
    let component: UpdateSystemUserComponent;
    let fixture: ComponentFixture<UpdateSystemUserComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateSystemUserComponent]
        });
        fixture = TestBed.createComponent(UpdateSystemUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});