import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveAplcationComponentComponent } from './student-leave-application-component.component';

describe('StudentLeaveAplcationComponentComponent', () => {
  let component: StudentLeaveAplcationComponentComponent;
  let fixture: ComponentFixture<StudentLeaveAplcationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLeaveAplcationComponentComponent]
    });
    fixture = TestBed.createComponent(StudentLeaveAplcationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
