import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UpdatePassageComponent } from './update-passage.component';
import { ListPassageComponent } from '../list-passages/list-passage.component';

describe('UpdatePassageComponent', () => {
  let component: UpdatePassageComponent;
  let fixture: ComponentFixture<UpdatePassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [UpdatePassageComponent, ListPassageComponent]
    });
    fixture = TestBed.createComponent(UpdatePassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
