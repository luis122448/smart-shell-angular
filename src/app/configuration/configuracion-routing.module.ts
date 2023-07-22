import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutConfigurationComponent } from './layout/layout-configuration/layout-configuration.component';
import { AuthGuard } from '@billing/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    canActivate: [ AuthGuard ],
    component: LayoutConfigurationComponent
  },
  {
    path: 'credits',
    canActivate: [ AuthGuard ],
    component: LayoutConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
