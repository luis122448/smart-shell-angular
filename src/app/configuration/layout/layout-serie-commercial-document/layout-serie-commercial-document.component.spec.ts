import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSerieCommercialDocumentComponent } from './layout-serie-commercial-document.component';

describe('LayoutSerieCommercialDocumentComponent', () => {
  let component: LayoutSerieCommercialDocumentComponent;
  let fixture: ComponentFixture<LayoutSerieCommercialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSerieCommercialDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSerieCommercialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
