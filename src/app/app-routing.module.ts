import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './guards/redirect.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    canActivate: [ RedirectGuard ],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:"billing",
    canActivate: [ AuthGuard ],
    loadChildren: () => import("@billing/billing.module").then(m => m.BillingModule)
  },
  {
    path:"ecommerce",
    loadChildren: () => import("./ecommerce/ecommerce.module").then(m => m.EcommerceModule)
  },
  {
    path: "configuration",
    canActivate: [ AuthGuard ],
    loadChildren: () => import("./configuration/configuration.module").then(m => m.ConfigurationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
