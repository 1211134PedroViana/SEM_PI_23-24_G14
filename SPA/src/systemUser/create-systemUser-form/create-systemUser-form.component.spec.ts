import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CreateSystemUserFormComponent} from "./create-systemUser-form.component";

describe('CreateSystemUserFormComponent', () => {
  let component: CreateSystemUserFormComponent;
  let fixture: ComponentFixture<CreateSystemUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSystemUserFormComponent]
    });
    fixture = TestBed.createComponent(CreateSystemUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
