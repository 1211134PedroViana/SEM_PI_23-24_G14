import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassageFormComponent } from './create-passage-form.component';

describe('CreatePassageFormComponent', () => {
  let component: CreatePassageFormComponent;
  let fixture: ComponentFixture<CreatePassageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePassageFormComponent]
    });
    fixture = TestBed.createComponent(CreatePassageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
