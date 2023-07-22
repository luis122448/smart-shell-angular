import { Component, OnInit } from '@angular/core';
import { GlobalStatusService } from '../../services/global-status.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout-invoice.component.html',
  styleUrls: ['./layout-invoice.component.scss']
})
export class LayoutInvoiceComponent implements OnInit{

  isLoading =  false;
  isStatusInvoice : 'search' | 'register' =  'register'
  constructor(
    private globalStatusService: GlobalStatusService
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

}
