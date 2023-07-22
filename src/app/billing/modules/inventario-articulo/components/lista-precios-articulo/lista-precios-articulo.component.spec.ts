import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreciosArticleComponent } from './lista-precios-articulo.component';

describe('ListaPreciosArticleComponent', () => {
  let component: ListaPreciosArticleComponent;
  let fixture: ComponentFixture<ListaPreciosArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPreciosArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPreciosArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
