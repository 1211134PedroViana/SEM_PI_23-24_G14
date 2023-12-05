import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminComponent } from './app-admin.component';

describe('AppSessionComponent', () => {
  let component: AppAdminComponent;
  let fixture: ComponentFixture<AppAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAdminComponent]
    });
    fixture = TestBed.createComponent(AppAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
