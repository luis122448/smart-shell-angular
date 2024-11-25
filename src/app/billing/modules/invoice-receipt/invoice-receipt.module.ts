import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/resume-invoice-receipt/resume-invoice-receipt.component';
import { SearchInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/search-invoice-receipt/search-invoice-receipt.component';
import { SearchDetailInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/search-detail-invoice-receipt/search-detail-invoice-receipt.component';
import { HeaderInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/header-invoice-receipt/header-invoice-receipt.component';
import { RegisterInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/register-invoice-receipt/register-invoice-receipt.component';
import { LayoutInvoiceReceiptComponent } from '@billing-module-invoice-receipt/layouts/layout-invoice-receipt/layout-invoice-receipt.component';
import { RegisterDetailInvoiceReceiptComponent } from '@billing-module-invoice-receipt/components/register-detail-invoice-receipt/register-detail-invoice-receipt.component';
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    RegisterInvoiceReceiptComponent,
    ResumeInvoiceReceiptComponent,
    SearchInvoiceReceiptComponent,
    HeaderInvoiceReceiptComponent,
    SearchDetailInvoiceReceiptComponent,
    RegisterDetailInvoiceReceiptComponent,
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
