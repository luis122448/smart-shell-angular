import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoClienteComponent } from '@billing-module-business-partner/components/basic-info-cliente/basic-info-cliente.component';
import { CondicionPagoClienteComponent } from '@billing-module-business-partner/components/condicion-pago-cliente/condicion-pago-cliente.component';
import { ContactoClienteComponent } from '@billing-module-business-partner/components/contacto-cliente/contacto-cliente.component';
import { DialogGetClienteComponent } from '@billing-module-business-partner/pages/dialog-get-cliente/dialog-get-cliente.component';
import { DialogAllClienteComponent } from '@billing-module-business-partner/pages/dialog-all-cliente/dialog-all-cliente.component';
import { DialogCrudClienteComponent } from '@billing-module-business-partner/pages/dialog-crud-cliente/dialog-crud-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BasicInfoClienteComponent,
    CondicionPagoClienteComponent,
    ContactoClienteComponent,
    DialogGetClienteComponent,
    DialogAllClienteComponent,
    DialogCrudClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SharedBillingModule,
    TranslateModule,
  ],
  exports: [
    BasicInfoClienteComponent,
    CondicionPagoClienteComponent,
    ContactoClienteComponent,
    DialogGetClienteComponent,
    DialogAllClienteComponent,
    DialogCrudClienteComponent
  ]
})
export class BusinessPartnerModule { }
