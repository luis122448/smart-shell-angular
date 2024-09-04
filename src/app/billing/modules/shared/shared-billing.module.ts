import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderbarLeftComponent } from './components/siderbar-left/siderbar-left.component';
import { SiderbarRightComponent } from './components/siderbar-right/siderbar-right.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultValuesComponent } from './components/default-values/default-values.component';

@NgModule({
  declarations: [
    SiderbarLeftComponent,
    SiderbarRightComponent,
    DefaultValuesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    SiderbarLeftComponent,
    SiderbarRightComponent,
    DefaultValuesComponent
  ]
})
export class SharedBillingModule { }
