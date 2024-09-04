import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceArticleComponent } from './ecommerce-articulo.component';

describe('EcommerceArticleComponent', () => {
  let component: EcommerceArticleComponent;
  let fixture: ComponentFixture<EcommerceArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommerceArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
