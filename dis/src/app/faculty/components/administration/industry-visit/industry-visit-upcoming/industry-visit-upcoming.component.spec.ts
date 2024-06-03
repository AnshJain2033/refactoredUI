import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryVisitUpcomingComponent } from './industry-visit-upcoming.component';

describe('IndustryVisitUpcomingComponent', () => {
  let component: IndustryVisitUpcomingComponent;
  let fixture: ComponentFixture<IndustryVisitUpcomingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryVisitUpcomingComponent]
    });
    fixture = TestBed.createComponent(IndustryVisitUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
