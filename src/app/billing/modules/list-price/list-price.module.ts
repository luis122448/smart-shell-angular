import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAllListPriceComponent } from '@billing-module-list-price/components/dialog-all-list-price/dialog-all-list-price.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCrudListPriceComponent } from '@billing-module-list-price/components/dialog-crud-list-price/dialog-crud-list-price.component';
import { BasicInfoListPriceComponent } from '@billing-module-list-price/components/basic-info-list-price/basic-info-list-price.component';
import { BasicArticleListPriceComponent } from '@billing-module-list-price/components/basic-article-list-price/basic-article-list-price.component';
import { BasicImportListPriceComponent } from '@billing-module-list-price/components/basic-import-list-price/basic-import-list-price.component';
import { ModalImportListPriceComponent } from '@billing-module-list-price/components/modal-import-list-price/modal-import-list-price.component';
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    DialogAllListPriceComponent,
    DialogCrudListPriceComponent,
    BasicInfoListPriceComponent,
    BasicArticleListPriceComponent,
    BasicImportListPriceComponent,
    ModalImportListPriceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SharedBillingModule,
    TranslateModule,
  ],
  exports: [
    DialogAllListPriceComponent,
    BasicImportListPriceComponent
  ]
})
export class ListPriceModule { }
