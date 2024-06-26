import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutInvoiceComponent } from './layout/layout-invoice/layout-invoice.component';
import { AuthGuard } from '../guards/auth.guard';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: LayoutDashboardComponent
  },
  {
    path: 'invoice',
    canActivate: [ AuthGuard ],
    component: LayoutInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
