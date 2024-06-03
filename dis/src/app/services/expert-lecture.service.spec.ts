import { TestBed } from '@angular/core/testing';

import { ExpertLectureService } from './expert-lecture.service';

describe('ExpertLectureService', () => {
  let service: ExpertLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
