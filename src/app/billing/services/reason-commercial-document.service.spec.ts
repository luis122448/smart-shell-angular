import { TestBed } from '@angular/core/testing';

import { ReasonCommercialDocumentService } from './reason-commercial-document.service';

describe('ReasonCommercialDocumentService', () => {
  let service: ReasonCommercialDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonCommercialDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
