import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoArticleComponent } from './basic-info-articulo.component';

describe('BasicInfoArticleComponent', () => {
  let component: BasicInfoArticleComponent;
  let fixture: ComponentFixture<BasicInfoArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
