import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ListRobotDesignationComponent} from "./list-robotsDesignation";

describe('ListRobotDesignationComponent', () => {
    let component: ListRobotDesignationComponent;
    let fixture: ComponentFixture<ListRobotDesignationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListRobotDesignationComponent]
        });
        fixture = TestBed.createComponent(ListRobotDesignationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});
