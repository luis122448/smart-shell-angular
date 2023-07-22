import { TestBed } from '@angular/core/testing';

import { SerieCommercialDocumentService } from './serie-commercial-document.service';

describe('SerieCommercialDocumentService', () => {
  let service: SerieCommercialDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieCommercialDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
