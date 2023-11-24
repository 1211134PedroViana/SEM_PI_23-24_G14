import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassageFormComponent } from './update-passage-form.component';

describe('UpdatePassageFormComponent', () => {
  let component: UpdatePassageFormComponent;
  let fixture: ComponentFixture<UpdatePassageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePassageFormComponent]
    });
    fixture = TestBed.createComponent(UpdatePassageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
