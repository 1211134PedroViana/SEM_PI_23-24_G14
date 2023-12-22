import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FeaturesComponent } from './features.component';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FeaturesComponent]
    });
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
