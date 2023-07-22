import { TestBed } from '@angular/core/testing';

import { DefaultValuesService } from './default-values.service';

describe('DefaultValuesService', () => {
  let service: DefaultValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
