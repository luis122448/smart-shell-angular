import { Component } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-header-invoice',
  templateUrl: './header-invoice.component.html',
  styleUrls: ['./header-invoice.component.scss']
})
export class HeaderInvoiceComponent {
  isLoading =  false
  isStatusInvoice : 'search' | 'register' =  'register'
  constructor(
    private globalStatusService: GlobalStatusService,
    private defaultValuesService: DefaultValuesService
  ){
    this.isStatusInvoice = this.globalStatusService.getStatusInvoice()
    this.globalStatusService.isLoading$.subscribe(
      {
        next:data =>{this.isLoading = data},
        error:error =>{this.isLoading = false}
      })
  }

  ngOnInit(): void {
    this.globalStatusService.isLoading$.subscribe(
      {
        next:data =>{this.isLoading = data},
        error:error =>{this.isLoading = false}
      })
    this.globalStatusService.isStatusInvoice$.subscribe(
      {
        next:data =>{this.isStatusInvoice = data },
        error:error =>{this.isStatusInvoice = 'register'}
      })
  }

  onRegisterInvoice(){
    this.globalStatusService.setStatusInvoice('register')
  }

  onSearchInvoice(){
    this.globalStatusService.setStatusInvoice('search')
  }

  onBranchChange(event: any){
    this.globalStatusService.setBranchSubject((event as HTMLSelectElement).value)
  }

  onPlaceOfIssueChange(event: any){
    this.globalStatusService.setPlaceOfIssue((event as HTMLSelectElement).value)
  }

}
