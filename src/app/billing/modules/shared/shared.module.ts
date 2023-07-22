import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SiderbarLeftComponent } from './components/siderbar-left/siderbar-left.component';
import { SiderbarRigthComponent } from './components/siderbar-rigth/siderbar-rigth.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultValuesComponent } from './components/default-values/default-values.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SiderbarLeftComponent,
    SiderbarRigthComponent,
    FooterComponent,
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
    RouterModule,
    FontAwesomeModule,
    SharedModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModuleFacturacion { }
