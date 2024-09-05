import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailItemsInternalGuideComponent } from '@billing-module-internal-guide/components/detail-items-internal-guide/detail-items-internal-guide.component';
import { DetailSearchInternalGuideComponent } from '@billing-module-internal-guide/components/detail-search-internal-guide/detail-search-internal-guide.component';
import { ResumeInternalGuideComponent } from '@billing-module-internal-guide/components/resume-internal-guide/resume-internal-guide.component';
import { SearchInternalGuideComponent } from '@billing-module-internal-guide/components/search-internal-guide/search-internal-guide.component';
import { RegisterInternalGuideComponent } from '@billing-module-internal-guide/components/register-internal-guide/register-internal-guide.component';
import { LayoutInternalGuideComponent } from '@billing-module-internal-guide/layouts/layout-internal-guide/layout-internal-guide.component';
import { SharedBillingModule } from '@billing-modules/shared/shared-billing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DetailItemsInternalGuideComponent,
    DetailSearchInternalGuideComponent,
    ResumeInternalGuideComponent,
    SearchInternalGuideComponent,
    RegisterInternalGuideComponent,
    LayoutInternalGuideComponent,
  ],
  imports: [CommonModule, SharedBillingModule, SharedModule],
  exports: [LayoutInternalGuideComponent, SearchInternalGuideComponent],
})
export class InternalGuideModule {}
