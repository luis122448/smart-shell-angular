import { Injectable, signal } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalStatusService {

  isLoading = signal<boolean>(false);
  isStatusInvoiceReceipt = signal<'search' | 'register'>('search');
  isStatusInternalGuide = signal<'search' | 'register'>('search');
  isStatusConfiguration = signal<'company' | 'serie'>('company');
  isBranch = signal<string>('1');
  isPlaceOfIssue = signal<string>('1');

  constructor(private ngxSpinnerService: NgxSpinnerService) {}

  setLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
    if (isLoading) {
      this.ngxSpinnerService.show().then(r => console.log(r));
    } else {
      this.ngxSpinnerService.hide().then(r => console.log(r));
    }
  }

  setStatusInvoiceReceipt(data: 'search' | 'register') {
    this.isStatusInvoiceReceipt.set(data);
  }

  setStatusInternalGuide(data: 'search' | 'register') {
    this.isStatusInternalGuide.set(data);
  }

  setStatusConfiguration(data: 'company' | 'serie') {
    this.isStatusConfiguration.set(data);
  }

  setBranch(data: string) {
    this.isBranch.set(data);
  }

  setPlaceOfIssue(data: string) {
    this.isPlaceOfIssue.set(data);
  }
}
