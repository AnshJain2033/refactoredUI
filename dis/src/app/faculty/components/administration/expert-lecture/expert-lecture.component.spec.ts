import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLectureComponent } from './expert-lecture.component';

describe('ExpertLectureComponent', () => {
  let component: ExpertLectureComponent;
  let fixture: ComponentFixture<ExpertLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLectureComponent]
    });
    fixture = TestBed.createComponent(ExpertLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
