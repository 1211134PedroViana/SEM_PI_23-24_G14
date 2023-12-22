import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
 
import { UpdateBuildingFormComponent } from './update-building-form.component';

describe('UpdateBuildingFormComponent', () => {
  let component: UpdateBuildingFormComponent;
  let fixture: ComponentFixture<UpdateBuildingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, FormsModule],
      declarations: [UpdateBuildingFormComponent]
    });
    fixture = TestBed.createComponent(UpdateBuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
