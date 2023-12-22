import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListFloorComponent } from './list-floor.component';

describe('ListFloorComponent', () => {
  let component: ListFloorComponent;
  let fixture: ComponentFixture<ListFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ListFloorComponent]
    });
    fixture = TestBed.createComponent(ListFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
