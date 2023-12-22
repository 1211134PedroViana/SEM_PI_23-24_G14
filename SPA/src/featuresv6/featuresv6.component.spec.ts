import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Featuresv6Component } from './featuresv6.component';

describe('Featuresv6Component', () => {
  let component: Featuresv6Component;
  let fixture: ComponentFixture<Featuresv6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Featuresv6Component]
    });
    fixture = TestBed.createComponent(Featuresv6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
