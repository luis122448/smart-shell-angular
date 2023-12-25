import { TestBed } from '@angular/core/testing';

import { ArticleAttachedService } from './article-attached.service';

describe('ArticleAttachedService', () => {
  let service: ArticleAttachedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleAttachedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
