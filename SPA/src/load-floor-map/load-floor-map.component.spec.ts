import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { LoadFloorMapComponent } from './load-floor-map.component';

describe('LoadFloorMapComponent', () => {
  let component: LoadFloorMapComponent;
  let fixture: ComponentFixture<LoadFloorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [LoadFloorMapComponent]
    });
    fixture = TestBed.createComponent(LoadFloorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
