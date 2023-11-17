import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CreateRoomFormComponent} from './create-room-form.component';

describe('CreateRoomFormComponent', () => {
  let component: CreateRoomFormComponent;
  let fixture: ComponentFixture<CreateRoomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
