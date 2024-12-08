import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaveCoordinatorComponent } from './assign-leave-coordinator.component';

describe('AssignLeaveCoordinatorComponent', () => {
  let component: AssignLeaveCoordinatorComponent;
  let fixture: ComponentFixture<AssignLeaveCoordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeaveCoordinatorComponent]
    });
    fixture = TestBed.createComponent(AssignLeaveCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
