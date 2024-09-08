import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogGetArticleComponent } from '@billing-module-inventory-article/pages/dialog-get-article/dialog-get-article.component';
import { BasicInfoArticleComponent } from '@billing-module-inventory-article/components/basic-info-articulo/basic-info-articulo.component';
import { EcommerceArticleComponent } from '@billing-module-inventory-article/components/ecommerce-articulo/ecommerce-articulo.component';
import { ClaseCodigoArticleComponent } from '@billing-module-inventory-article/components/clase-codigo-articulo/clase-codigo-articulo.component';
import { ListaPreciosArticleComponent } from '@billing-module-inventory-article/components/lista-precios-articulo/lista-precios-articulo.component';
import { DialogAllInventoryArticleComponent } from '@billing-module-inventory-article/components/dialog-all-inventario-articulo/dialog-all-inventario-articulo.component';
import { DialogAllArticleComponent } from '@billing-module-inventory-article/components/dialog-all-articulo/dialog-all-articulo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCrudArticleComponent } from '@billing-module-inventory-article/components/dialog-crud-articulo/dialog-crud-articulo.component';
import { DialogImportArticleComponent } from '@billing-module-inventory-article/components/dialog-import-article/dialog-import-article.component';
import { BasicImportArticleComponent } from '@billing-module-inventory-article/components/basic-import-article/basic-import-article.component';
import { ListPriceModule } from '@billing-module-list-price/list-price.module';
import { BasicArticleAttachedComponent } from '@billing-module-inventory-article/components/basic-article-attached/basic-article-attached.component';
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    DialogGetArticleComponent,
    BasicInfoArticleComponent,
    EcommerceArticleComponent,
    ClaseCodigoArticleComponent,
    ListaPreciosArticleComponent,
    DialogAllInventoryArticleComponent,
    DialogAllArticleComponent,
    DialogCrudArticleComponent,
    DialogImportArticleComponent,
    BasicImportArticleComponent,
    BasicArticleAttachedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListPriceModule,
    SharedModule,
    SharedBillingModule,
    TranslateModule,
  ],
  exports:[
    BasicInfoArticleComponent,
    EcommerceArticleComponent,
    ClaseCodigoArticleComponent,
    ListaPreciosArticleComponent
  ]
})
export class InventoryArticleModule { }
