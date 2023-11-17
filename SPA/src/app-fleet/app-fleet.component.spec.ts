import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFleetComponent } from './app-fleet.component';

describe('AppFleetComponent', () => {
  let component: AppFleetComponent;
  let fixture: ComponentFixture<AppFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppFleetComponent]
    });
    fixture = TestBed.createComponent(AppFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
