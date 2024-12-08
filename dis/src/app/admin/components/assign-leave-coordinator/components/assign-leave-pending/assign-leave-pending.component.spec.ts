import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeavePendingComponent } from './assign-leave-pending.component';

describe('AssignLeavePendingComponent', () => {
  let component: AssignLeavePendingComponent;
  let fixture: ComponentFixture<AssignLeavePendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLeavePendingComponent]
    });
    fixture = TestBed.createComponent(AssignLeavePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
