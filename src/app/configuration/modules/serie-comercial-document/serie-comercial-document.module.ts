import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSerieCommercialDocumentComponent } from '@configuration/modules/serie-comercial-document/components/search-serie-commercial-document/search-serie-commercial-document.component';
import { CrudSerieCommercialDocumentComponent } from './components/crud-serie-commercial-document/crud-serie-commercial-document.component';
import { BasicSerieCommercialDocumentComponent } from './components/basic-serie-commercial-document/basic-serie-commercial-document.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormatSerieCommercialDocumentComponent } from './components/format-serie-commercial-document/format-serie-commercial-document.component';
import { LayoutSerieCommercialDocumentComponent } from './pages/layout-serie-commercial-document/layout-serie-commercial-document.component';
import { SharedConfigurationModule } from '../shared-configuration/shared-configuration.module';

@NgModule({
  declarations: [
    SearchSerieCommercialDocumentComponent,
    CrudSerieCommercialDocumentComponent,
    BasicSerieCommercialDocumentComponent,
    FormatSerieCommercialDocumentComponent,
    LayoutSerieCommercialDocumentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedConfigurationModule,
    TranslateModule
  ],
  exports: [
    LayoutSerieCommercialDocumentComponent
  ]
})
export class SerieComercialDocumentModule { }
