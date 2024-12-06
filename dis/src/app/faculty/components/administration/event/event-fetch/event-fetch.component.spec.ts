import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFetchComponent } from './event-fetch.component';

describe('EventFetchComponent', () => {
  let component: EventFetchComponent;
  let fixture: ComponentFixture<EventFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFetchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
