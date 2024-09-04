import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInvoiceReceiptComponent } from './layout-invoice-receipt.component';

describe('LayoutInvoiceReceiptComponent', () => {
  let component: LayoutInvoiceReceiptComponent;
  let fixture: ComponentFixture<LayoutInvoiceReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutInvoiceReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInvoiceReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
