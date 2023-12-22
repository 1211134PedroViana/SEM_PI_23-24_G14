import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppCampusComponent } from './app-campus.component';
import { CampusSideBarComponent } from '../campus-side-bar/campus-side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('AppSessionComponent', () => {
  let component: AppCampusComponent;
  let fixture: ComponentFixture<AppCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppCampusComponent, CampusSideBarComponent, NavbarComponent]
    });
    fixture = TestBed.createComponent(AppCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
