import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportArticleComponent } from './dialog-import-article.component';

describe('DialogImportArticleComponent', () => {
  let component: DialogImportArticleComponent;
  let fixture: ComponentFixture<DialogImportArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogImportArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
