import { TestBed } from '@angular/core/testing';

import { TypeBusinessPartnerService } from './type-business-partner.service';

describe('TypeBusinessPartnerService', () => {
  let service: TypeBusinessPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeBusinessPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
