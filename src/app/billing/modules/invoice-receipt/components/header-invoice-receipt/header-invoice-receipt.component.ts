import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';

@Component({
  selector: 'app-header-invoice-receipt',
  templateUrl: './header-invoice-receipt.component.html',
  styleUrls: ['./header-invoice-receipt.component.scss']
})
export class HeaderInvoiceReceiptComponent {
  @Output() isNewDocument = new EventEmitter<boolean>();
  isStatusInvoiceReceipt = this.globalStatusService.isStatusInvoiceReceipt;

  constructor(private globalStatusService: GlobalStatusService) {}

  onRegisterInvoice() {
    this.isNewDocument.emit(true);
    this.globalStatusService.setStatusInvoiceReceipt('register');
  }

  onSearchInvoice() {
    this.isNewDocument.emit(true);
    this.globalStatusService.setStatusInvoiceReceipt('search');
  }

  onBranchChange(event: any) {
    this.globalStatusService.setBranch((event as HTMLSelectElement).value);
  }

  onPlaceOfIssueChange(event: any) {
    this.globalStatusService.setPlaceOfIssue((event as HTMLSelectElement).value);
  }
}
