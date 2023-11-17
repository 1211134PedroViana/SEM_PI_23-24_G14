import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassageComponent } from './list-passage.component';

describe('ListPassagesComponent', () => {
  let component: ListPassageComponent;
  let fixture: ComponentFixture<ListPassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
