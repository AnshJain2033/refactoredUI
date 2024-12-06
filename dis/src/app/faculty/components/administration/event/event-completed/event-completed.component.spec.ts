import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCompletedComponent } from './event-completed.component';

describe('EventCompletedComponent', () => {
  let component: EventCompletedComponent;
  let fixture: ComponentFixture<EventCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCompletedComponent]
    });
    fixture = TestBed.createComponent(EventCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
