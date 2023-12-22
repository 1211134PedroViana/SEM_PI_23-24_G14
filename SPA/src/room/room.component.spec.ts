import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoomComponent } from './room.component';
import { FeaturesComponent } from '../features/features.component';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RoomComponent, FeaturesComponent]
    });
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
