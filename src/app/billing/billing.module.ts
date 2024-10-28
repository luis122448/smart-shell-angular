import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { SharedBillingModule } from './modules/shared/shared-billing.module';
import { SharedModule } from "@shared/shared.module";
import { BusinessPartnerModule } from './modules/business-partner/business-partner.module';
import { InventoryArticleModule } from './modules/inventory-article/inventory-article.module';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { DashboardCommercialComponent } from './pages/dashboard-commercial/dashboard-commercial.component';
import { ListPriceModule } from './modules/list-price/list-price.module';
import { DialogAllDocumentTransactionComponent } from './components/dialog-all-document-transaction/dialog-all-document-transaction.component';
import { InvoiceReceiptModule } from "@billing-module-invoice-receipt/invoice-receipt.module";
import { InternalGuideModule } from "@billing-module-internal-guide/internal-guide.module";
import { InventoryTakingModule } from "@billing-module-inventory-taking/inventory-taking.module";
import { ExchangeRateModule } from "@billing-module-exchange-rate/exchange-rate.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LayoutDashboardComponent,
    DashboardCommercialComponent,
    DialogAllDocumentTransactionComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    ExchangeRateModule,
    BusinessPartnerModule,
    InventoryArticleModule,
    ListPriceModule,
    InvoiceReceiptModule,
    InternalGuideModule,
    InventoryTakingModule,
    SharedBillingModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
  ],
  providers: [
    DatePipe
  ],
})
export class BillingModule { }
