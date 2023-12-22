import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListFloorsWithPassagesComponent } from './list-floors-with-passages.component';

describe('ListFloorsWithPassagesComponent', () => {
  let component: ListFloorsWithPassagesComponent;
  let fixture: ComponentFixture<ListFloorsWithPassagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ListFloorsWithPassagesComponent]
    });
    fixture = TestBed.createComponent(ListFloorsWithPassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
