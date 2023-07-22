import { TestBed } from '@angular/core/testing';

import { ListPriceArticleService } from './list-price-article.service';

describe('ListPriceArticleService', () => {
  let service: ListPriceArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPriceArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
