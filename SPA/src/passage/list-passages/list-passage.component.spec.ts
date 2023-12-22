import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListPassageComponent } from './list-passage.component';

describe('ListPassagesComponent', () => {
  let component: ListPassageComponent;
  let fixture: ComponentFixture<ListPassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ListPassageComponent]
    });
    fixture = TestBed.createComponent(ListPassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
