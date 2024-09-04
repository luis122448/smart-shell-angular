import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailItemsInventoryTakingComponent } from '@billing-module-inventory-taking/components/detail-items-inventory-taking/detail-items-inventory-taking.component';
import { DetailSearchInventoryTakingComponent } from '@billing-module-inventory-taking/components/detail-search-inventory-taking/detail-search-inventory-taking.component';
import { ResumeInventoryTakingComponent } from '@billing-module-inventory-taking/components/resume-inventory-taking/resume-inventory-taking.component';
import { HeaderInventoryTakingComponent } from '@billing-module-inventory-taking/components/header-inventory-taking/header-inventory-taking.component';
import { SearchInventoryTakingComponent } from '@billing-module-inventory-taking/components/search-inventory-taking/search-inventory-taking.component';
import { RegisterInventoryTakingComponent } from '@billing-module-inventory-taking/components/register-inventory-taking/register-inventory-taking.component';
import { LayoutInventoryTakingComponent } from '@billing-module-inventory-taking/layouts/layout-inventory-taking/layout-inventory-taking.component';
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DetailItemsInventoryTakingComponent,
    DetailSearchInventoryTakingComponent,
    ResumeInventoryTakingComponent,
    HeaderInventoryTakingComponent,
    SearchInventoryTakingComponent,
    RegisterInventoryTakingComponent,
    LayoutInventoryTakingComponent
  ],
  imports: [
    CommonModule,
    SharedBillingModule,
    SharedModule
  ],
  exports: [
    LayoutInventoryTakingComponent
  ]
})
export class InventoryTakingModule { }
