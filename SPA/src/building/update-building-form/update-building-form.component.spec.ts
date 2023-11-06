import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuildingFormComponent } from './update-building-form.component';

describe('UpdateBuildingFormComponent', () => {
  let component: UpdateBuildingFormComponent;
  let fixture: ComponentFixture<UpdateBuildingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBuildingFormComponent]
    });
    fixture = TestBed.createComponent(UpdateBuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
