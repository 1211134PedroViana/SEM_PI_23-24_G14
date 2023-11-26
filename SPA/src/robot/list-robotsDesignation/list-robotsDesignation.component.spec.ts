import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ListRobotsDesignationComponent} from "./list-robotsDesignation.component";

describe('ListRobotsDesignationComponent', () => {
    let component: ListRobotsDesignationComponent;
    let fixture: ComponentFixture<ListRobotsDesignationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListRobotsDesignationComponent]
        });
        fixture = TestBed.createComponent(ListRobotsDesignationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});
