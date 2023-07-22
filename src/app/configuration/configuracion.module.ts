import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { LayoutConfigurationComponent } from './layout/layout-configuration/layout-configuration.component';
import { PrincipalConfigurationComponent } from './pages/principal-configuration/principal-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { SharedModuleFacturacion } from '@billing/modules/shared/shared.module';
import { LayoutCreditsComponent } from './layout/layout-credits/layout-credits.component';
import { PersonalCreditsComponent } from './pages/personal-credits/personal-credits.component';

@NgModule({
  declarations: [
    LayoutConfigurationComponent,
    PrincipalConfigurationComponent,
    LayoutCreditsComponent,
    PersonalCreditsComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    SharedModule,
    SharedModuleFacturacion
  ],
  providers: [
    DatePipe
  ],
})
export class ConfiguracionModule { }
