import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SystemUserComponent } from './systemUser.component';

describe('SystemUserComponent', () => {
  let component: SystemUserComponent;
  let fixture: ComponentFixture<SystemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SystemUserComponent]
    });
    fixture = TestBed.createComponent(SystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
