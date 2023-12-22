import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Featuresv4Component } from './featuresv4.component';

describe('Featuresv4Component', () => {
  let component: Featuresv4Component;
  let fixture: ComponentFixture<Featuresv4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Featuresv4Component]
    });
    fixture = TestBed.createComponent(Featuresv4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
