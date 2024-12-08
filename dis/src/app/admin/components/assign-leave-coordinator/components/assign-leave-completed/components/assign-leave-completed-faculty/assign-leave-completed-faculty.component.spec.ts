import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaveCompletedFacultyComponent } from './assign-leave-completed-faculty.component';

describe('AssignLeaveCompletedFacultyComponent', () => {
  let component: AssignLeaveCompletedFacultyComponent;
  let fixture: ComponentFixture<AssignLeaveCompletedFacultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeaveCompletedFacultyComponent]
    });
    fixture = TestBed.createComponent(AssignLeaveCompletedFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
