import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSerieCommercialDocumentComponent } from './crud-serie-commercial-document.component';

describe('CrudSerieCommercialDocumentComponent', () => {
  let component: CrudSerieCommercialDocumentComponent;
  let fixture: ComponentFixture<CrudSerieCommercialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudSerieCommercialDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudSerieCommercialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
