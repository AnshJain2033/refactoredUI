import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveApplicationComponent } from './student-leave-application.component';

describe('StudentLeaveApplicationComponent', () => {
  let component: StudentLeaveApplicationComponent;
  let fixture: ComponentFixture<StudentLeaveApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLeaveApplicationComponent]
    });
    fixture = TestBed.createComponent(StudentLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
