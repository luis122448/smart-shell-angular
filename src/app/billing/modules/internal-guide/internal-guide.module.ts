import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterDetailInternalGuideComponent
} from "@billing-module-internal-guide/components/register-detail-internal-guide/register-detail-internal-guide.component";
import {
  SearchDetailInternalGuideComponent
} from "@billing-module-internal-guide/components/search-detail-internal-guide/search-detail-internal-guide.component";
import { ResumeInternalGuideComponent } from '@billing-module-internal-guide/components/resume-internal-guide/resume-internal-guide.component';
import { SearchInternalGuideComponent } from '@billing-module-internal-guide/components/search-internal-guide/search-internal-guide.component';
import { RegisterInternalGuideComponent } from '@billing-module-internal-guide/components/register-internal-guide/register-internal-guide.component';
import { LayoutInternalGuideComponent } from '@billing-module-internal-guide/layouts/layout-internal-guide/layout-internal-guide.component';
import { SharedBillingModule } from '@billing-modules/shared-billing/shared-billing.module';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  HeaderInternalGuideComponent
} from "@billing-module-internal-guide/components/header-internal-guide/header-internal-guide.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    HeaderInternalGuideComponent,
    RegisterDetailInternalGuideComponent,
    SearchDetailInternalGuideComponent,
    ResumeInternalGuideComponent,
    SearchInternalGuideComponent,
    RegisterInternalGuideComponent,
    LayoutInternalGuideComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedBillingModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [LayoutInternalGuideComponent, SearchInternalGuideComponent],
})
export class InternalGuideModule {}
