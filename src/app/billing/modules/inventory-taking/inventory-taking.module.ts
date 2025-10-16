import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterDetailInventoryTakingComponent
} from "@billing-module-inventory-taking/components/register-detail-inventory-taking/register-detail-inventory-taking.component";
import { SearchDetailInventoryTakingComponent } from '@billing-module-inventory-taking/components/search-detail-inventory-taking/search-detail-inventory-taking.component';
import { ResumeInventoryTakingComponent } from '@billing-module-inventory-taking/components/resume-inventory-taking/resume-inventory-taking.component';
import { HeaderInventoryTakingComponent } from '@billing-module-inventory-taking/components/header-inventory-taking/header-inventory-taking.component';
import { SearchInventoryTakingComponent } from '@billing-module-inventory-taking/components/search-inventory-taking/search-inventory-taking.component';
import { RegisterInventoryTakingComponent } from '@billing-module-inventory-taking/components/register-inventory-taking/register-inventory-taking.component';
import { LayoutInventoryTakingComponent } from '@billing-module-inventory-taking/layouts/layout-inventory-taking/layout-inventory-taking.component';
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    RegisterDetailInventoryTakingComponent,
    SearchDetailInventoryTakingComponent,
    ResumeInventoryTakingComponent,
    HeaderInventoryTakingComponent,
    SearchInventoryTakingComponent,
    RegisterInventoryTakingComponent,
    LayoutInventoryTakingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedBillingModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
    LayoutInventoryTakingComponent
  ]
})
export class InventoryTakingModule { }
