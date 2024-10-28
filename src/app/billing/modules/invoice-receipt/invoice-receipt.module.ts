import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeFacbolComponent } from '@billing-module-invoice-receipt/components/resume-facbol/resume-facbol.component';
import { SearchInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/search-invoice-receipt/search-invoice-receipt.component';
import { SearchDetailInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/search-detail-invoice-receipt/search-detail-invoice-receipt.component';
import { HeaderInvoiceComponent } from '@billing-module-invoice-receipt/components/header-invoice/header-invoice.component';
import { RegisterFacbolComponent } from '@billing-module-invoice-receipt/components/register-facbol/register-facbol.component';
import { LayoutInvoiceReceiptComponent } from '@billing-module-invoice-receipt/layouts/layout-invoice-receipt/layout-invoice-receipt.component';
import { DetailItemsFacbolComponent } from '@billing-module-invoice-receipt/components/detail-items-facbol/detail-items-facbol.component';
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    RegisterFacbolComponent,
    ResumeFacbolComponent,
    SearchInvoiceReceiptComponent,
    HeaderInvoiceComponent,
    SearchDetailInvoiceReceiptComponent,
    DetailItemsFacbolComponent,
    LayoutInvoiceReceiptComponent
  ],
  imports: [
    CommonModule,
    SharedBillingModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
    LayoutInvoiceReceiptComponent
  ]
})

export class InvoiceReceiptModule { }
