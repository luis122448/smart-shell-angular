import { TestBed } from '@angular/core/testing';

import { GlobalStatusService } from './global-status.service';

describe('GlobalStatusService', () => {
  let service: GlobalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
