import { TestBed } from '@angular/core/testing';

import { TypeCommercialDocumentService } from './type-commercial-document.service';

describe('TypeCommercialDocumentService', () => {
  let service: TypeCommercialDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCommercialDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
