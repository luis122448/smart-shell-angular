import { TestBed } from '@angular/core/testing';

import { TypePaymentConditionService } from './type-payment-condition.service';

describe('TypePaymentConditionService', () => {
  let service: TypePaymentConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePaymentConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
