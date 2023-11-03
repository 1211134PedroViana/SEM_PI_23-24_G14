import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSideBarComponent } from './campus-side-bar.component';

describe('CampusSideBarComponent', () => {
  let component: CampusSideBarComponent;
  let fixture: ComponentFixture<CampusSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusSideBarComponent]
    });
    fixture = TestBed.createComponent(CampusSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
