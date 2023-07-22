import { TestBed } from '@angular/core/testing';

import { FacbolOperacService } from './facbol-operac.service';

describe('FacbolOperacService', () => {
  let service: FacbolOperacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacbolOperacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
