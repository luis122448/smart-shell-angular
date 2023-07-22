import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllArticleComponent } from './dialog-all-articulo.component';

describe('DialogAllArticleComponent', () => {
  let component: DialogAllArticleComponent;
  let fixture: ComponentFixture<DialogAllArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
