import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleAttachedComponent } from './basic-article-attached.component';

describe('BasicArticleAttachedComponent', () => {
  let component: BasicArticleAttachedComponent;
  let fixture: ComponentFixture<BasicArticleAttachedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicArticleAttachedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicArticleAttachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
