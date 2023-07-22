import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudArticleComponent } from './dialog-crud-articulo.component';

describe('DialogCrudArticleComponent', () => {
  let component: DialogCrudArticleComponent;
  let fixture: ComponentFixture<DialogCrudArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrudArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrudArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
