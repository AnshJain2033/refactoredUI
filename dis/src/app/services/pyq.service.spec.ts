import { TestBed } from '@angular/core/testing';

import { PyqService } from './pyq.service';

describe('PyqService', () => {
  let service: PyqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PyqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
