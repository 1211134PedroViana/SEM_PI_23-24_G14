import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotApprovedSurTaskComponent } from './list-notApprovedSurTask.component';

describe('ListBuildingsComponent', () => {
  let component: ListNotApprovedSurTaskComponent;
  let fixture: ComponentFixture<ListNotApprovedSurTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNotApprovedSurTaskComponent]
    });
    fixture = TestBed.createComponent(ListNotApprovedSurTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
