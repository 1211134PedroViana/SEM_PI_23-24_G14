import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateFloorFormComponent } from './create-floor-form.component';

describe('CreateFloorFormComponent', () => {
  let component: CreateFloorFormComponent;
  let fixture: ComponentFixture<CreateFloorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
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
