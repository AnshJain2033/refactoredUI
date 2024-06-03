import { TestBed } from '@angular/core/testing';

import { IndustryVisitService } from './industry-visit.service';

describe('IndustryVisitService', () => {
  let service: IndustryVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustryVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
