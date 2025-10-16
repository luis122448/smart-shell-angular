import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { LayoutConfigurationComponent } from './layout/layout-configuration/layout-configuration.component';
import { PrincipalConfigurationComponent } from './pages/principal-configuration/principal-configuration.component';
import { SharedModule } from "@shared/shared.module";
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { LayoutCreditsComponent } from './layout/layout-credits/layout-credits.component';
import { PersonalCreditsComponent } from './pages/personal-credits/personal-credits.component';
import { CardPresentationComponent } from './components/card-presentation/card-presentation.component';
import { CardExperienceComponent } from './components/card-experience/card-experience.component';
import { TranslateModule } from "@ngx-translate/core";
import { SerieComercialDocumentModule } from './modules/serie-comercial-document/serie-comercial-document.module';
import { SharedConfigurationModule } from './modules/shared-configuration/shared-configuration.module';

@NgModule({
  declarations: [
    LayoutConfigurationComponent,
    PrincipalConfigurationComponent,
    LayoutCreditsComponent,
    PersonalCreditsComponent,
    CardPresentationComponent,
    CardExperienceComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    SharedConfigurationModule,
    SerieComercialDocumentModule,
    SharedBillingModule,
    TranslateModule,
  ],
  providers: [
    DatePipe
  ],
})
export class ConfigurationModule { }
