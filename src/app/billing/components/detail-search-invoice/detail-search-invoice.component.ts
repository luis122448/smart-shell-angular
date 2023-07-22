import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { MyDate } from '@billing-utils/date';
import { DataSourceSearchDocumentInvoice } from '@billing/pages/search-facbol/search-facbol.component';
import { faBan, faBuildingColumns, faEnvelope, faPrint, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';

@Component({
  selector: 'app-detail-search-invoice',
  templateUrl: './detail-search-invoice.component.html',
  styleUrls: ['./detail-search-invoice.component.scss']
})
export class DetailSearchInvoiceComponent {

  faRectangleList = faRectangleList
  faPrint = faPrint
  faEnvelope = faEnvelope
  faBuildingColumns = faBuildingColumns
  faBan = faBan
  totalElements = 0
  pageSize = 100
  displayedColumns = ['action','numint','document','destypcomdoc','dessitcomdoc','registdate','desreacomdoc','codbuspar','busnam'
  ,'desplaiss','codcur','dessel','destyppaycon','impsaleprice','imptotal']

  dataSourceSearchDocument = DataSourceSearchDocumentInvoice.getInstance();

  constructor(
    private dialog: Dialog,
    private datePipe: DatePipe,
    private documentInvoiceService: DocumentInvoiceService
  ){}

  byPageEvent(event: any){

  }

  onPrint(numint: number){
    this.documentInvoiceService.getPrintDocument(numint)
    .subscribe({
      next:data =>{
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: { status:data.status, meesage:data.message }
          })
        }
        if (data.status>=0) {
          console.log(data.bytes)
          this.openArchive(data.bytes,data.format) // PDF ( BASE64 )
        }
      }
    })
  }

  openArchive(base64Data: string, format: string): void {
    const byteCharacters = atob(base64Data); // Decodificar el Base64 a bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const file = new Blob([byteArray], { type: 'application/pdf' }); // Crear un Blob con el contenido del PDF
    const fileURL = URL.createObjectURL(file);

    // Abrir una nueva pestaña en el navegador con el PDF
    window.open(fileURL, '_blank');
  }

  onSendEmail(numint: number){

  }

  onSendSunat(numint: number){

  }

  onCancel(numint: number){

  }


  formatDate(date: number[]): String {
    const aux : Date = MyDate.convertToCustomDateShort(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())){
      return this.datePipe.transform(aux,'dd/MM/yy') || ''
    }
    return ''
  }

}
