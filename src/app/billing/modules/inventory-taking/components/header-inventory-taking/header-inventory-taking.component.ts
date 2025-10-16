import { Component, EventEmitter, Output } from "@angular/core";
import { GlobalStatusService } from "@billing-services/global-status.service";
import { DocumentInventoryTakingService } from "@billing-services/document-inventory-taking.service";

@Component({
  selector: 'app-header-inventory-taking',
  templateUrl: './header-inventory-taking.component.html',
  styleUrls: ['./header-inventory-taking.component.scss']
})
export class HeaderInventoryTakingComponent {
  @Output() isNewDocument = new EventEmitter<boolean>();
  isStatusInventoryTaking = this.documentInventoryTakingService.isStatusInventoryTaking;

  constructor(private documentInventoryTakingService: DocumentInventoryTakingService,
              private globalStatusService: GlobalStatusService) {}

  onRegisterInvoice() {
    this.isNewDocument.emit(true);
    this.documentInventoryTakingService.setStatusInventoryTaking('register');
  }

  onSearchInvoice() {
    this.isNewDocument.emit(true);
    this.documentInventoryTakingService.setStatusInventoryTaking('search');
  }

  onBranchChange(event: any) {
    this.globalStatusService.setBranch((event as HTMLSelectElement).value);
  }

  onPlaceOfIssueChange(event: any) {
    this.globalStatusService.setPlaceOfIssue((event as HTMLSelectElement).value);
  }
}
