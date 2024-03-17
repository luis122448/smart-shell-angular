import { TestBed } from '@angular/core/testing';

import { DocumentTransactionService } from './document-transaction.service';

describe('DocumentTransactionService', () => {
  let service: DocumentTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
