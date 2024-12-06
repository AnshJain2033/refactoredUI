import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOngoingComponent } from './event-ongoing.component';

describe('EventOngoingComponent', () => {
  let component: EventOngoingComponent;
  let fixture: ComponentFixture<EventOngoingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventOngoingComponent]
    });
    fixture = TestBed.createComponent(EventOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
