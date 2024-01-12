import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSerieCommercialDocumentComponent } from './basic-serie-commercial-document.component';

describe('BasicSerieCommercialDocumentComponent', () => {
  let component: BasicSerieCommercialDocumentComponent;
  let fixture: ComponentFixture<BasicSerieCommercialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSerieCommercialDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSerieCommercialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
