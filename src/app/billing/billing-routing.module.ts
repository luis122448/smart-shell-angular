import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { LayoutInvoiceReceiptComponent } from '@billing-modules/invoice-receipt/layouts/layout-invoice-receipt/layout-invoice-receipt.component';
import { LayoutInternalGuideComponent } from '@billing-modules/internal-guide/layouts/layout-internal-guide/layout-internal-guide.component';
import { LayoutInventoryTakingComponent } from '@billing-modules/inventory-taking/layouts/layout-inventory-taking/layout-inventory-taking.component';

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
    path: 'invoice-receipt',
    canActivate: [ AuthGuard ],
    component: LayoutInvoiceReceiptComponent
  },
  {
    path: 'internal-guide',
    canActivate: [ AuthGuard ],
    component: LayoutInternalGuideComponent
  },
  {
    path: 'inventory-taking',
    canActivate: [ AuthGuard ],
    component: LayoutInventoryTakingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
