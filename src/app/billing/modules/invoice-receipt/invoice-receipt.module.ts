import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeFacbolComponent } from '@billing-module-invoice-receipt/components/resume-facbol/resume-facbol.component';
import { SearchFacbolComponent } from '@billing-module-invoice-receipt/components/search-facbol/search-facbol.component';
import { DetailSearchInvoiceComponent } from '@billing-module-invoice-receipt/components/detail-search-invoice/detail-search-invoice.component';
import { HeaderInvoiceComponent } from '@billing-module-invoice-receipt/components/header-invoice/header-invoice.component';
import { RegisterFacbolComponent } from '@billing-module-invoice-receipt/components/register-facbol/register-facbol.component';
import { LayoutInvoiceReceiptComponent } from '@billing-module-invoice-receipt/layouts/layout-invoice-receipt/layout-invoice-receipt.component';
import { DetailItemsFacbolComponent } from '@billing-module-invoice-receipt/components/detail-items-facbol/detail-items-facbol.component';
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    RegisterFacbolComponent,
    ResumeFacbolComponent,
    SearchFacbolComponent,
    HeaderInvoiceComponent,
    DetailSearchInvoiceComponent,
    DetailItemsFacbolComponent,
    LayoutInvoiceReceiptComponent
  ],
  imports: [
    CommonModule,
    SharedBillingModule,
    SharedModule
  ],
  exports: [
    LayoutInvoiceReceiptComponent
  ]
})

export class InvoiceReceiptModule { }
