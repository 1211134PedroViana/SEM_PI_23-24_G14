import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSystemUserComponent } from './create-systemUser.component';

describe('CreateSystemUserComponent', () => {
  let component: CreateSystemUserComponent;
  let fixture: ComponentFixture<CreateSystemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSystemUserComponent]
    });
    fixture = TestBed.createComponent(CreateSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
