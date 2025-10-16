import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultValuesComponent } from './components/default-values/default-values.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    DefaultValuesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
    DefaultValuesComponent
  ]
})
export class SharedBillingModule { }
