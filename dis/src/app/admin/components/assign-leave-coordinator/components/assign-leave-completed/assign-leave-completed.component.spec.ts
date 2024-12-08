import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaveCompletedComponent } from './assign-leave-completed.component';

describe('AssignLeaveCompletedComponent', () => {
  let component: AssignLeaveCompletedComponent;
  let fixture: ComponentFixture<AssignLeaveCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeaveCompletedComponent]
    });
    fixture = TestBed.createComponent(AssignLeaveCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
