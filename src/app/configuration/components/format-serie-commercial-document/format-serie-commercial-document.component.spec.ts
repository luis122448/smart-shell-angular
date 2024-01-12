import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatSerieCommercialDocumentComponent } from './format-serie-commercial-document.component';

describe('FormatSerieCommercialDocumentComponent', () => {
  let component: FormatSerieCommercialDocumentComponent;
  let fixture: ComponentFixture<FormatSerieCommercialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatSerieCommercialDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatSerieCommercialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
