import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpcomingComponent } from './event-upcoming.component';

describe('EventUpcomingComponent', () => {
  let component: EventUpcomingComponent;
  let fixture: ComponentFixture<EventUpcomingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventUpcomingComponent]
    });
    fixture = TestBed.createComponent(EventUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
