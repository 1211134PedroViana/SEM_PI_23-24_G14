import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithPassagesComponent } from './list-floorsWithPassages.component';

describe('ListFloorsWithPassagesComponent', () => {
  let component: ListFloorsWithPassagesComponent;
  let fixture: ComponentFixture<ListFloorsWithPassagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
