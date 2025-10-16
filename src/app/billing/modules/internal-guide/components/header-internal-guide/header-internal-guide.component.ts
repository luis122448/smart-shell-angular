import { Component, EventEmitter, Output } from "@angular/core";
import { DocumentInternalGuideService } from "@billing-services/document-internal-guide.service";
import { GlobalStatusService } from "@billing-services/global-status.service";

@Component({
  selector: 'app-header-internal-guide',
  templateUrl: './header-internal-guide.component.html',
  styleUrl: './header-internal-guide.component.scss',
})
export class HeaderInternalGuideComponent {
  @Output() isNewDocument = new EventEmitter<boolean>();
  isStatusInternalGuide = this.documentInternalGuideService.isStatusInternalGuide;

  constructor(private documentInternalGuideService: DocumentInternalGuideService,
              private globalStatusService: GlobalStatusService) {}

  onRegisterInvoice() {
    this.isNewDocument.emit(true);
    this.documentInternalGuideService.setStatusInternalGuide('register');
  }

  onSearchInvoice() {
    this.isNewDocument.emit(true);
    this.documentInternalGuideService.setStatusInternalGuide('search');
  }

  onBranchChange(event: any) {
    this.globalStatusService.setBranch((event as HTMLSelectElement).value);
  }

  onPlaceOfIssueChange(event: any) {
    this.globalStatusService.setPlaceOfIssue((event as HTMLSelectElement).value);
  }
}

