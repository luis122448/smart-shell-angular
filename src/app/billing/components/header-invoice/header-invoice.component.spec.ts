import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInvoiceComponent } from './header-invoice.component';

describe('HeaderInvoiceComponent', () => {
  let component: HeaderInvoiceComponent;
  let fixture: ComponentFixture<HeaderInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
