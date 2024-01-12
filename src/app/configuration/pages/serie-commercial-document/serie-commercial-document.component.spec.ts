import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieCommercialDocumentComponent } from './serie-commercial-document.component';

describe('SerieCommercialDocumentComponent', () => {
  let component: SerieCommercialDocumentComponent;
  let fixture: ComponentFixture<SerieCommercialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerieCommercialDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieCommercialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
