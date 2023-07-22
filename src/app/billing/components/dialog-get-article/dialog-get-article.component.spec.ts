import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGetArticleComponent } from './dialog-get-article.component';

describe('DialogGetArticleComponent', () => {
  let component: DialogGetArticleComponent;
  let fixture: ComponentFixture<DialogGetArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGetArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGetArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
