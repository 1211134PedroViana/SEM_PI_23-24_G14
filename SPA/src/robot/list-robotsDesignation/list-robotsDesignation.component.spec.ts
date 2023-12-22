import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {ListRobotsDesignationComponent} from "./list-robotsDesignation.component";

describe('ListRobotsDesignationComponent', () => {
    let component: ListRobotsDesignationComponent;
    let fixture: ComponentFixture<ListRobotsDesignationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
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
