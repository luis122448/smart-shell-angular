import { Component } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { DocumentInvoiceReceiptService } from '@billing-services/document-invoice-receipt.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DocumentInvoice } from '@billing-models/document-invoice.model';

@Component({
  selector: 'app-layout-invoice-receipt',
  templateUrl: './layout-invoice-receipt.component.html',
  styleUrls: ['./layout-invoice-receipt.component.scss']
})
export class LayoutInvoiceReceiptComponent{
  isEditDocumentValue : DocumentInvoice | undefined = undefined
  isStatusInvoiceReceipt = this.globalStatusService.isStatusInvoiceReceipt;
  isNewDocumentValue = false
  isCalculateDocumentValue = false

  constructor(
    private documentInvoiceService: DocumentInvoiceReceiptService,
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
  ){}

  isNewDocument($event:boolean){
    this.isEditDocumentValue = undefined
    this.isNewDocumentValue = $event
  }

  isModifyDocument($event:number){
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
            this.globalStatusService.setStatusInvoiceReceipt('register')
          } else {
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { no_data_found: 'Y' }
            })
          }
        }
      }
    })
  }

  isCalculateDocument($event:boolean){
    this.isCalculateDocumentValue = $event
  }

}
