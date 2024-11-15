import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { LayoutConfigurationComponent } from './layout/layout-configuration/layout-configuration.component';
import { PrincipalConfigurationComponent } from './pages/principal-configuration/principal-configuration.component';
import { SharedModule } from "@shared/shared.module";
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { LayoutCreditsComponent } from './layout/layout-credits/layout-credits.component';
import { PersonalCreditsComponent } from './pages/personal-credits/personal-credits.component';
import { SerieCommercialDocumentComponent } from './pages/serie-commercial-document/serie-commercial-document.component';
import { LayoutSerieCommercialDocumentComponent } from './layout/layout-serie-commercial-document/layout-serie-commercial-document.component';
import { CrudSerieCommercialDocumentComponent } from './components/crud-serie-commercial-document/crud-serie-commercial-document.component';
import { BasicSerieCommercialDocumentComponent } from './components/basic-serie-commercial-document/basic-serie-commercial-document.component';
import { HeaderConfigurationComponent } from './components/header-configuration/header-configuration.component';
import { FormatSerieCommercialDocumentComponent } from './components/format-serie-commercial-document/format-serie-commercial-document.component';
import { CardPresentationComponent } from './components/card-presentation/card-presentation.component';
import { CardExperienceComponent } from './components/card-experience/card-experience.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LayoutConfigurationComponent,
    PrincipalConfigurationComponent,
    LayoutCreditsComponent,
    PersonalCreditsComponent,
    SerieCommercialDocumentComponent,
    LayoutSerieCommercialDocumentComponent,
    CrudSerieCommercialDocumentComponent,
    BasicSerieCommercialDocumentComponent,
    HeaderConfigurationComponent,
    FormatSerieCommercialDocumentComponent,
    CardPresentationComponent,
    CardExperienceComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    SharedBillingModule,
    TranslateModule,
  ],
  providers: [
    DatePipe
  ],
})
export class ConfigurationModule { }
