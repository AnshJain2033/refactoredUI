import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableDialogComponent } from './time-table-dialog.component';

describe('TimeTableDialogComponent', () => {
  let component: TimeTableDialogComponent;
  let fixture: ComponentFixture<TimeTableDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableDialogComponent]
    });
    fixture = TestBed.createComponent(TimeTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
