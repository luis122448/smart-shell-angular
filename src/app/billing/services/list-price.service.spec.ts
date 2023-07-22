import { TestBed } from '@angular/core/testing';

import { ListPriceService } from './list-price.service';

describe('ListPriceService', () => {
  let service: ListPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
