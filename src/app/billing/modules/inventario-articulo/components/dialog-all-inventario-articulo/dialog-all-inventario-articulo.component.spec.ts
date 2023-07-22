import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllInventarioArticleComponent } from './dialog-all-inventario-articulo.component';

describe('DialogAllInventarioArticleComponent', () => {
  let component: DialogAllInventarioArticleComponent;
  let fixture: ComponentFixture<DialogAllInventarioArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllInventarioArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllInventarioArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
