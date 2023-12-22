import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateSystemUserComponent } from './create-systemUser.component';
import {CreateSystemUserFormComponent} from "../create-systemUser-form/create-systemUser-form.component";

describe('CreateSystemUserComponent', () => {
  let component: CreateSystemUserComponent;
  let fixture: ComponentFixture<CreateSystemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateSystemUserComponent, CreateSystemUserFormComponent]
    });
    fixture = TestBed.createComponent(CreateSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
