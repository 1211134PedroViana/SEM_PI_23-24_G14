import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreatePassageFormComponent } from './create-passage-form.component';

describe('CreatePassageFormComponent', () => {
  let component: CreatePassageFormComponent;
  let fixture: ComponentFixture<CreatePassageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
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
