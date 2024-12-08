import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeavePendingStudentComponent } from './assign-leave-pending-student.component';

describe('AssignLeavePendingStudentComponent', () => {
  let component: AssignLeavePendingStudentComponent;
  let fixture: ComponentFixture<AssignLeavePendingStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeavePendingStudentComponent]
    });
    fixture = TestBed.createComponent(AssignLeavePendingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
