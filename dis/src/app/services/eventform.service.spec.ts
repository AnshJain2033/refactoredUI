import { TestBed } from '@angular/core/testing';

import { EventformService } from './eventform.service';

describe('EventformService', () => {
  let service: EventformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
