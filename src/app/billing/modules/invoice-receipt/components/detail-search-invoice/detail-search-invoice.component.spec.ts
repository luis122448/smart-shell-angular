import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSearchInvoiceComponent } from './detail-search-invoice.component';

describe('DetailSearchInvoiceComponent', () => {
  let component: DetailSearchInvoiceComponent;
  let fixture: ComponentFixture<DetailSearchInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSearchInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSearchInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
