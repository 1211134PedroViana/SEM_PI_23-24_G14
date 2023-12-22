import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import {CreateRoomFormComponent} from './create-room-form.component';

describe('CreateRoomFormComponent', () => {
  let component: CreateRoomFormComponent;
  let fixture: ComponentFixture<CreateRoomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateRoomFormComponent]
    });
    fixture = TestBed.createComponent(CreateRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
