import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderbarLeftComponent } from './components/siderbar-left/siderbar-left.component';
import { SiderbarRigthComponent } from './components/siderbar-rigth/siderbar-rigth.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultValuesComponent } from './components/default-values/default-values.component';

@NgModule({
  declarations: [
    SiderbarLeftComponent,
    SiderbarRigthComponent,
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
    SiderbarRigthComponent,
    DefaultValuesComponent,
    RouterModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class SharedModuleFacturacion { }
