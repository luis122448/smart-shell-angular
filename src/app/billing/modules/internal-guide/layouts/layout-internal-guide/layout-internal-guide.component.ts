import { Component } from '@angular/core';
import { DocumentInvoice } from "@billing-models/document-invoice.model";
import { DataSourceDocumentDetail, DataSourceDocumentHeader } from "@billing/data/datasource-facbol.service";
import { DocumentInternalGuideService } from "@billing-services/document-internal-guide.service";
import { Dialog } from "@angular/cdk/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogErrorAlertComponent } from "@shared/components/dialog-error-alert/dialog-error-alert.component";
import { MatsnackbarSuccessComponent } from "@shared/components/matsnackbar-success/matsnackbar-success.component";
import { MatSnackBarSuccessConfig } from "@billing-utils/constants";

@Component({
  selector: 'app-layout-internal-guide',
  templateUrl: './layout-internal-guide.component.html',
  styleUrls: ['./layout-internal-guide.component.scss']
})
export class LayoutInternalGuideComponent {

  isLoading =  false;
  isEditDocumentValue : DocumentInvoice | undefined = undefined
  isStatusInternalGuide = this.documentInternalGuideService.isStatusInternalGuide;
  isNewDocumentValue = false
  isCalculateDocumentValue = false
  dataDetailSource = DataSourceDocumentDetail.getInstance();
  dataHeaderSource = DataSourceDocumentHeader.getInstance();

  constructor(
    private documentInternalGuideService: DocumentInternalGuideService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
  ){}

  isNewDocument($event:boolean){
    this.isEditDocumentValue = undefined
    this.isNewDocumentValue = $event
  }

  isModifyDocument($event:number){
    this.documentInternalGuideService.getByNumint($event).subscribe({
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
            this.documentInternalGuideService.setStatusInternalGuide('register')
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
