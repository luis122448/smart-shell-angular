import { TestBed } from '@angular/core/testing';

import { ArticleSpecificationService } from './article-specification.service';

describe('ArticleSpecificationService', () => {
  let service: ArticleSpecificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleSpecificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
