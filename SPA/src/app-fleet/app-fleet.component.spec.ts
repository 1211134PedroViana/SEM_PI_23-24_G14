import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppFleetComponent } from './app-fleet.component';
import { FleetSideBarComponent } from '../fleet-side-bar/fleet-side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('AppFleetComponent', () => {
  let component: AppFleetComponent;
  let fixture: ComponentFixture<AppFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppFleetComponent, FleetSideBarComponent, NavbarComponent]
    });
    fixture = TestBed.createComponent(AppFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
