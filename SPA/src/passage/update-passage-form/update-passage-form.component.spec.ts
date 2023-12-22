import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UpdatePassageFormComponent } from './update-passage-form.component';

describe('UpdatePassageFormComponent', () => {
  let component: UpdatePassageFormComponent;
  let fixture: ComponentFixture<UpdatePassageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
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
