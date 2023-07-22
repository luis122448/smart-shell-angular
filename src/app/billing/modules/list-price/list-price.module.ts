import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAllListPriceComponent } from './components/dialog-all-list-price/dialog-all-list-price.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCrudListPriceComponent } from './components/dialog-crud-list-price/dialog-crud-list-price.component';
import { BasicInfoListPriceComponent } from './components/basic-info-list-price/basic-info-list-price.component';
import { BasicArticleListPriceComponent } from './components/basic-article-list-price/basic-article-list-price.component';
import { BasicImportListPriceComponent } from './components/basic-import-list-price/basic-import-list-price.component';
import { ModalImportListPriceComponent } from './components/modal-import-list-price/modal-import-list-price.component';

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
    SharedModule
  ],
  exports: [
    DialogAllListPriceComponent,
  ]
})
export class ListPriceModule { }
