import { TestBed } from '@angular/core/testing';

import { FormatCommercialDocumentService } from './format-commercial-document.service';

describe('FormatCommercialDocumentService', () => {
  let service: FormatCommercialDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatCommercialDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
