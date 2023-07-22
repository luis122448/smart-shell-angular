import { TestBed } from '@angular/core/testing';

import { DatasourceFacbolService } from './datasource-facbol.service';

describe('DatasourceFacbolService', () => {
  let service: DatasourceFacbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceFacbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
