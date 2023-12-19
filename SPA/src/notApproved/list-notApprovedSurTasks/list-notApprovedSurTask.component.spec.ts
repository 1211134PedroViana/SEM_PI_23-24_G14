import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotApprovedTaskComponent } from './list-notApprovedSurTask.component';

describe('ListBuildingsComponent', () => {
  let component: ListNotApprovedTaskComponent;
  let fixture: ComponentFixture<ListNotApprovedTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNotApprovedTaskComponent]
    });
    fixture = TestBed.createComponent(ListNotApprovedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
