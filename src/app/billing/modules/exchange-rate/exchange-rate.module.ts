import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoExchangeRateComponent } from '@billing-module-exchange-rate/components/basic-info-exchange-rate/basic-info-exchange-rate.component';
import { BasicAllExchangeRateComponent } from '@billing-module-exchange-rate/components/basic-all-exchange-rate/basic-all-exchange-rate.component';
import { DialogCrudExchangeRateComponent } from '@billing-module-exchange-rate/pages/dialog-crud-exchange-rate/dialog-crud-exchange-rate.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { SharedBillingModule } from "@billing-modules/shared-billing/shared-billing.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BasicInfoExchangeRateComponent,
    BasicAllExchangeRateComponent,
    DialogCrudExchangeRateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    SharedBillingModule,
    TranslateModule,
  ],
  exports: [
    BasicInfoExchangeRateComponent,
    BasicAllExchangeRateComponent,
    DialogCrudExchangeRateComponent
  ]
})
export class ExchangeRateModule { }
