import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { LayoutInvoiceComponent } from './layout/layout-invoice/layout-invoice.component';
import { SharedModuleFacturacion } from './modules/shared/shared.module';
import { RegisterFacbolComponent } from './components/register-facbol/register-facbol.component';
import { SharedModule } from '../shared/shared.module';
import { DialogGetClienteComponent } from './modules/interlocutor-comercial/page/dialog-get-cliente/dialog-get-cliente.component';
import { DetailItemsFacbolComponent } from './components/detail-items-facbol/detail-items-facbol.component';
import { DialogGetArticleComponent } from './components/dialog-get-article/dialog-get-article.component';
import { DialogAllClienteComponent } from './modules/interlocutor-comercial/page/dialog-all-cliente/dialog-all-cliente.component';
import { DialogCrudClienteComponent } from './modules/interlocutor-comercial/page/dialog-crud-cliente/dialog-crud-cliente.component';
import { DialogCrudExchangeRateComponent } from './modules/exchange-rate/pages/dialog-crud-tipo-cambio/dialog-crud-tipo-cambio.component';
// Modulos Importados
import { InterlocutorComercialModule } from './modules/interlocutor-comercial/interlocutor-comercial.module';
import { InventarioArticleModule } from './modules/inventario-articulo/inventario-articulo.module';
import { ResumeFacbolComponent } from './components/resume-facbol/resume-facbol.component';
import { SearchFacbolComponent } from './components/search-facbol/search-facbol.component';
import { DetailSearchInvoiceComponent } from './components/detail-search-invoice/detail-search-invoice.component';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { DashboardCommercialComponent } from './pages/dashboard-commercial/dashboard-commercial.component';
import { ListPriceModule } from './modules/list-price/list-price.module';
import { HeaderInvoiceComponent } from './components/header-invoice/header-invoice.component';
import { SiderbarLeftComponent } from './modules/shared/components/siderbar-left/siderbar-left.component';
import { BasicInfoExchangeRateComponent } from './modules/exchange-rate/components/basic-info-exchange-rate/basic-info-exchange-rate.component';
import { BasicAllExchangeRateComponent } from './modules/exchange-rate/components/basic-all-exchange-rate/basic-all-exchange-rate.component';
import { DialogAllDocumentTransactionComponent } from './components/dialog-all-document-transaction/dialog-all-document-transaction.component';

@NgModule({
  declarations: [
    LayoutInvoiceComponent,
    RegisterFacbolComponent,
    DialogGetClienteComponent,
    DetailItemsFacbolComponent,
    DialogGetArticleComponent,
    DialogAllClienteComponent,
    DialogCrudClienteComponent,
    DialogCrudExchangeRateComponent,
    ResumeFacbolComponent,
    SearchFacbolComponent,
    DetailSearchInvoiceComponent,
    LayoutDashboardComponent,
    DashboardCommercialComponent,
    HeaderInvoiceComponent,
    BasicInfoExchangeRateComponent,
    BasicAllExchangeRateComponent,
    DialogAllDocumentTransactionComponent,
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    SharedModuleFacturacion,
    SharedModule,
    InterlocutorComercialModule,
    InventarioArticleModule,
    ListPriceModule
  ],
  exports: [
    InterlocutorComercialModule,
    InventarioArticleModule,
    ListPriceModule,
  ],
  providers: [
    DatePipe
  ],
})
export class FacturacionModule { }
