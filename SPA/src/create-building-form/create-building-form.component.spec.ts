import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingFormComponent } from './create-building-form.component';

describe('CreateBuildingFormComponent', () => {
  let component: CreateBuildingFormComponent;
  let fixture: ComponentFixture<CreateBuildingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildingFormComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
