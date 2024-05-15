import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalStatusService } from '../../services/global-status.service';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DataSourceDocumentDetail, DataSourceDocumentHeader } from '@billing/data/datasource-facbol.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DocumentInvoice } from '@billing-models/document-invoice.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout-invoice.component.html',
  styleUrls: ['./layout-invoice.component.scss']
})
export class LayoutInvoiceComponent implements OnInit{

  isLoading =  false;
  isEditDocumentValue : DocumentInvoice | undefined = undefined
  isStatusInvoice : 'search' | 'register' =  'register'
  isNewDocumentValue = false
  isCalculateDocumentValue = false
  dataDetailSource = DataSourceDocumentDetail.getInstance();
  dataHeaderSource = DataSourceDocumentHeader.getInstance();

  constructor(
    private globalStatusService: GlobalStatusService,
    private documentInvoiceService: DocumentInvoiceService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
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

  isNewDocument($event:boolean){
    this.isEditDocumentValue = undefined
    this.isNewDocumentValue = $event
  }

  isModifyDocument($event:number){
    this.globalStatusService.setLoading(true)
    this.documentInvoiceService.getByNumint($event).subscribe({
      next:data =>{
        if(data.status<=0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else {
          if (data.object?.header && data.object?.details) {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.isEditDocumentValue = data.object
            this.isNewDocumentValue = false
            this.globalStatusService.setStatusInvoice('register')
          } else {
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { no_data_found: 'Y' }
            })
          }
        }
      },
      error:err =>{
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
        this.globalStatusService.setLoading(false)
      },
      complete:() =>{
        this.globalStatusService.setLoading(false)
      }
    })
  }

  isCalculateDocument($event:boolean){
    this.isCalculateDocumentValue = $event
  }

}
