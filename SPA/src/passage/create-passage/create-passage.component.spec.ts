import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreatePassageComponent } from './create-passage.component';
import { CreatePassageFormComponent } from '../create-passage-form/create-passage-form.component';

describe('CreatePassageComponent', () => {
  let component: CreatePassageComponent;
  let fixture: ComponentFixture<CreatePassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreatePassageComponent, CreatePassageFormComponent]
    });
    fixture = TestBed.createComponent(CreatePassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
