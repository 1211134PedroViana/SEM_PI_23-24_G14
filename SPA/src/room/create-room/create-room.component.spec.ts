import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CreateRoomComponent } from './create-room.component';
import {CreateRoomFormComponent} from '../create-room-form/create-room-form.component';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [CreateRoomComponent, CreateRoomFormComponent]
    });
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
