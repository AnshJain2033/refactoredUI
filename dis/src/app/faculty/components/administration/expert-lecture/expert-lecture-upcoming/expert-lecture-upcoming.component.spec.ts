import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLectureUpcomingComponent } from './expert-lecture-upcoming.component';

describe('ExpertLectureUpcomingComponent', () => {
  let component: ExpertLectureUpcomingComponent;
  let fixture: ComponentFixture<ExpertLectureUpcomingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLectureUpcomingComponent]
    });
    fixture = TestBed.createComponent(ExpertLectureUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
