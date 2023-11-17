import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCampusComponent } from './app-campus.component';

describe('AppSessionComponent', () => {
  let component: AppCampusComponent;
  let fixture: ComponentFixture<AppCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCampusComponent]
    });
    fixture = TestBed.createComponent(AppCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
