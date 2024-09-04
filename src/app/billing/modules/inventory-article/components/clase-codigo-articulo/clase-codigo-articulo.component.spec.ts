import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseCodigoArticleComponent } from './clase-codigo-articulo.component';

describe('ClaseCodigoArticleComponent', () => {
  let component: ClaseCodigoArticleComponent;
  let fixture: ComponentFixture<ClaseCodigoArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseCodigoArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseCodigoArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
