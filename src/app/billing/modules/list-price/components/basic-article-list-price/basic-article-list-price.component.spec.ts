import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleListPriceComponent } from './basic-article-list-price.component';

describe('BasicArticleListPriceComponent', () => {
  let component: BasicArticleListPriceComponent;
  let fixture: ComponentFixture<BasicArticleListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicArticleListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicArticleListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
