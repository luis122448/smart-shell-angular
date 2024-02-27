import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MyDate } from '@billing-utils/date';
import { DataSourceSearchDocumentInvoice } from '@billing/components/search-facbol/search-facbol.component';
import { faBan, faBuildingColumns, faEnvelope, faPrint, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';

@Component({
  selector: 'app-detail-search-invoice',
  templateUrl: './detail-search-invoice.component.html',
  styleUrls: ['./detail-search-invoice.component.scss']
})
export class DetailSearchInvoiceComponent {

  @Output() pageEvent = new EventEmitter<PageEvent>()
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
    private documentInvoiceService: DocumentInvoiceService,
    private globalStatusService: GlobalStatusService
  ){}

  byPageEvent(e: PageEvent){
    this.pageEvent.emit(e)
  }

  onPrint(numint: number){
    this.globalStatusService.setLoading(true)
    this.documentInvoiceService.getPrintDocument(numint)
    .subscribe({
      next:data =>{
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else {
          this.openArchive(data.bytes,data.format) // PDF ( BASE64 )
        }
      },
      error: err =>{
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
        this.globalStatusService.setLoading(false)
      },
      complete: () => this.globalStatusService.setLoading(false)
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
    this.globalStatusService.setLoading(true)
    setTimeout(() => {
      this.globalStatusService.setLoading(false)
    }, 1500);
  }

  onSendSunat(numint: number){
    this.globalStatusService.setLoading(true)
    setTimeout(() => {
      this.globalStatusService.setLoading(false)
    }, 1500);
  }

  onCancel(numint: number){
    this.globalStatusService.setLoading(true)
    this.documentInvoiceService.putCancelDocument(numint).subscribe({
      next:data =>{
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        }
      },
      error: err =>{
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
      },
      complete: () => this.globalStatusService.setLoading(false)
    })
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
