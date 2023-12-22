import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppAdminComponent } from './app-admin.component';
import {AdminSideBarComponent} from "../admin-side-bar/admin-side-bar.component";
import { NavbarComponent } from '../navbar/navbar.component';

describe('AppSessionComponent', () => {
  let component: AppAdminComponent;
  let fixture: ComponentFixture<AppAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppAdminComponent, AdminSideBarComponent, NavbarComponent]
    });
    fixture = TestBed.createComponent(AppAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
