import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import {CreateSystemUserFormComponent} from "./create-systemUser-form.component";

describe('CreateSystemUserFormComponent', () => {
  let component: CreateSystemUserFormComponent;
  let fixture: ComponentFixture<CreateSystemUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
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
