import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveDetailComponent } from './student-leave-detail.component';

describe('StudentLeaveDetailComponent', () => {
  let component: StudentLeaveDetailComponent;
  let fixture: ComponentFixture<StudentLeaveDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLeaveDetailComponent]
    });
    fixture = TestBed.createComponent(StudentLeaveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
