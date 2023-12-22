import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListRobotsComponent } from './list-robots.component';

describe('ListRobotsComponent', () => {
    let component: ListRobotsComponent;
    let fixture: ComponentFixture<ListRobotsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
            declarations: [ListRobotsComponent]
        });
        fixture = TestBed.createComponent(ListRobotsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});