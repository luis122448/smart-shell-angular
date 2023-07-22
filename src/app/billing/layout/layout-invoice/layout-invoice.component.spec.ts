import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInvoiceComponent } from './layout-invoice.component';

describe('LayoutInvoiceComponent', () => {
  let component: LayoutInvoiceComponent;
  let fixture: ComponentFixture<LayoutInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
