import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RedirectGuard } from './billing/guards/redirect.guard';
import { AuthGuard } from './billing/guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    canActivate: [ RedirectGuard ],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:"billing",
    canActivate: [ AuthGuard ],
    loadChildren: () => import("./billing/facturacion.module").then(m => m.FacturacionModule)
  },
  {
    path:"ecommerce",
    loadChildren: () => import("./ecommerce/ecommerce.module").then(m => m.EcommerceModule)
  },
  {
    path: "configuration",
    canActivate: [ AuthGuard ],
    loadChildren: () => import("./configuration/configuracion.module").then(m => m.ConfiguracionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
