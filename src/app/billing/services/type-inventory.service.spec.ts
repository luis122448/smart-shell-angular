import { TestBed } from '@angular/core/testing';

import { TypeInventoryService } from './type-inventory.service';

describe('TypeInventoryService', () => {
  let service: TypeInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
