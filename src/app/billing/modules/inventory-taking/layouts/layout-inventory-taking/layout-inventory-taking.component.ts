import { Dialog } from '@angular/cdk/dialog';
import { Component } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentInvoice } from '@billing-models/document-invoice.model';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DataSourceDocumentDetail, DataSourceDocumentHeader } from '@billing/data/datasource-facbol.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { DocumentInventoryTakingService } from "@billing-services/document-inventory-taking.service";

@Component({
  selector: 'app-layout-inventory-taking',
  templateUrl: './layout-inventory-taking.component.html',
  styleUrls: ['./layout-inventory-taking.component.scss']
})
export class LayoutInventoryTakingComponent {

  isLoading =  false;
  isEditDocumentValue : DocumentInvoice | undefined = undefined
  isStatusInventoryTaking = this.documentInventoryTakingService.isStatusInventoryTaking;
  isNewDocumentValue = false
  isCalculateDocumentValue = false
  dataDetailSource = DataSourceDocumentDetail.getInstance();
  dataHeaderSource = DataSourceDocumentHeader.getInstance();

  constructor(
    private documentInventoryTakingService: DocumentInventoryTakingService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
  ){}

  isNewDocument($event:boolean){
    this.isEditDocumentValue = undefined
    this.isNewDocumentValue = $event
  }

  isModifyDocument($event:number){
    this.documentInventoryTakingService.getByNumint($event).subscribe({
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
            this.documentInventoryTakingService.setStatusInventoryTaking('register')
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
