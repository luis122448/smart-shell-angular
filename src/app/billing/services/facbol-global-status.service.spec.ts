import { TestBed } from '@angular/core/testing';

import { FacbolGlobalStatusService } from './facbol-global-status.service';

describe('FacbolGlobalStatusService', () => {
  let service: FacbolGlobalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacbolGlobalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
