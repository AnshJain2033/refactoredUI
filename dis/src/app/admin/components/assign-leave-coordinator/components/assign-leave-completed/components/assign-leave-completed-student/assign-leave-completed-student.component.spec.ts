import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaveCompletedStudentComponent } from './assign-leave-completed-student.component';

describe('AssignLeaveCompletedStudentComponent', () => {
  let component: AssignLeaveCompletedStudentComponent;
  let fixture: ComponentFixture<AssignLeaveCompletedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeaveCompletedStudentComponent]
    });
    fixture = TestBed.createComponent(AssignLeaveCompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
