import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllInventoryArticleComponent } from './dialog-all-inventario-articulo.component';

describe('DialogAllInventoryArticleComponent', () => {
  let component: DialogAllInventoryArticleComponent;
  let fixture: ComponentFixture<DialogAllInventoryArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllInventoryArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllInventoryArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
