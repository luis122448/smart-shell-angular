import { TestBed } from '@angular/core/testing';

import { DocumentInvoiceService } from './document-invoice.service';

describe('DocumentInvoiceService', () => {
  let service: DocumentInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
