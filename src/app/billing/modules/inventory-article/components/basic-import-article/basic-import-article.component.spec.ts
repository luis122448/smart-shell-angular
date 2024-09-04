import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicImportArticleComponent } from './basic-import-article.component';

describe('BasicImportArticleComponent', () => {
  let component: BasicImportArticleComponent;
  let fixture: ComponentFixture<BasicImportArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicImportArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicImportArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
