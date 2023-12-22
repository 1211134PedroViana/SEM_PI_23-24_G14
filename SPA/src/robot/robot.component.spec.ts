import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RobotComponent } from './robot.component';
import { Featuresv4Component } from '../featuresv4/featuresv4.component';

describe('RobotComponent', () => {
    let component: RobotComponent;
    let fixture: ComponentFixture<RobotComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [RobotComponent, Featuresv4Component]
        });
        fixture = TestBed.createComponent(RobotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})