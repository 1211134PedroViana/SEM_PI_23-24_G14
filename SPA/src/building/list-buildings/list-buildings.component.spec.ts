import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListBuildingsComponent } from './list-buildings.component';

describe('ListBuildingsComponent', () => {
  let component: ListBuildingsComponent;
  let fixture: ComponentFixture<ListBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ListBuildingsComponent]
    });
    fixture = TestBed.createComponent(ListBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

