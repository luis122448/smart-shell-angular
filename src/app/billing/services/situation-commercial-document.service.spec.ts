import { TestBed } from '@angular/core/testing';

import { SituationCommercialDocumentService } from './situation-commercial-document.service';

describe('SituationCommercialDocumentService', () => {
  let service: SituationCommercialDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituationCommercialDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
