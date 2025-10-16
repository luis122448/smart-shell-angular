import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderConfigurationComponent } from './header-configuration/header-configuration.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    HeaderConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    HeaderConfigurationComponent
  ]
})
export class SharedConfigurationModule { }
