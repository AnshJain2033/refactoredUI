import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeavePendingFacultyComponent } from './assign-leave-pending-faculty.component';

describe('AssignLeavePendingFacultyComponent', () => {
  let component: AssignLeavePendingFacultyComponent;
  let fixture: ComponentFixture<AssignLeavePendingFacultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeavePendingFacultyComponent]
    });
    fixture = TestBed.createComponent(AssignLeavePendingFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
