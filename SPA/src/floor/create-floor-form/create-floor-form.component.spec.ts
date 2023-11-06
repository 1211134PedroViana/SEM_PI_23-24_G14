import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorFormComponent } from './create-floor-form.component';

describe('CreateFloorFormComponent', () => {
  let component: CreateFloorFormComponent;
  let fixture: ComponentFixture<CreateFloorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFloorFormComponent]
    });
    fixture = TestBed.createComponent(CreateFloorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
