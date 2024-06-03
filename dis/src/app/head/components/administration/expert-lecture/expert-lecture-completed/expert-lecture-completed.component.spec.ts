import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLectureCompletedComponent } from './expert-lecture-completed.component';

describe('ExpertLectureCompletedComponent', () => {
  let component: ExpertLectureCompletedComponent;
  let fixture: ComponentFixture<ExpertLectureCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLectureCompletedComponent]
    });
    fixture = TestBed.createComponent(ExpertLectureCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
