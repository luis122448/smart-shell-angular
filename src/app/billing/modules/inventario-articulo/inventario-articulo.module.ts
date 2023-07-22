import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoArticleComponent } from './components/basic-info-articulo/basic-info-articulo.component';
import { EcommerceArticleComponent } from './components/ecommerce-articulo/ecommerce-articulo.component';
import { ClaseCodigoArticleComponent } from './components/clase-codigo-articulo/clase-codigo-articulo.component';
import { ListaPreciosArticleComponent } from './components/lista-precios-articulo/lista-precios-articulo.component';
import { DialogAllInventarioArticleComponent } from './components/dialog-all-inventario-articulo/dialog-all-inventario-articulo.component';
import { DialogAllArticleComponent } from './components/dialog-all-articulo/dialog-all-articulo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCrudArticleComponent } from './components/dialog-crud-articulo/dialog-crud-articulo.component';

@NgModule({
  declarations: [
    BasicInfoArticleComponent,
    EcommerceArticleComponent,
    ClaseCodigoArticleComponent,
    ListaPreciosArticleComponent,
    DialogAllInventarioArticleComponent,
    DialogAllArticleComponent,
    DialogCrudArticleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    BasicInfoArticleComponent,
    EcommerceArticleComponent,
    ClaseCodigoArticleComponent,
    ListaPreciosArticleComponent
  ]
})
export class InventarioArticleModule { }
