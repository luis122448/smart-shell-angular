import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentInvoiceReceiptService } from '@billing-services/document-invoice-receipt.service';
import { DocumentTransactionService } from '@billing-services/document-transaction.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DataSourceSearchDocumentGeneric } from '@billing-module-invoice-receipt/components/search-invoice-receipt/search-invoice-receipt.component';
import {
  faBan,
  faBuildingColumns,
  faEnvelope,
  faPrint,
  faRectangleList,
  faFilePen,
  faList,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { DialogAllDocumentTransactionComponent } from '@billing-components/dialog-all-document-transaction/dialog-all-document-transaction.component';
import { DialogQuestionCommentComponent } from '@shared/components/dialog-question-comment/dialog-question-comment.component';
import { SearchDocumentGeneric } from '@billing-models/document-invoice.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { GlobalStatusService } from '@billing-services/global-status.service';

export interface DialogQuestionComment {
  status: boolean;
  commen: string;
}

@Component({
  selector: 'app-search-detail-invoice-receipt',
  templateUrl: './search-detail-invoice-receipt.component.html',
  styleUrls: ['./search-detail-invoice-receipt.component.scss'],
})
export class SearchDetailInvoiceReceiptComponent {
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() modifyDocument = new EventEmitter<number>();
  faRectangleList = faRectangleList;
  faPrint = faPrint;
  faXmark = faXmark;
  faEnvelope = faEnvelope;
  faBuildingColumns = faBuildingColumns;
  faBan = faBan;
  faFilePen = faFilePen;
  faList = faList;
  totalElements = 0;
  pageSize = 100;
  displayedColumns = [
    'action',
    'numint',
    'document',
    'destypcomdoc',
    'dessitcomdoc',
    'registdate',
    'desreacomdoc',
    'codbuspar',
    'busnam',
    'desplaiss',
    'codcur',
    'dessel',
    'destyppaycon',
    'impsaleprice',
    'imptotal',
  ];

  dataSourceSearchDocument = DataSourceSearchDocumentGeneric.getInstance();

  constructor(
    private dialog: Dialog,
    private datePipe: DatePipe,
    private matSnackBar: MatSnackBar,
    private documentInvoiceService: DocumentInvoiceReceiptService,
    private globalStatusService: GlobalStatusService,
    private documentTransactionService: DocumentTransactionService,
    private clipboard: Clipboard
  ) {}

  byPageEvent(e: PageEvent) {
    this.pageEvent.emit(e);
  }

  onOpenOverlay(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint,true);
  }

  onPrint(numint: number) {
    this.documentInvoiceService.getPrintDocument(numint).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          this.matSnackBar.openFromComponent(
            MatsnackbarSuccessComponent,
            MatSnackBarSuccessConfig
          );
          this.openArchive(data.bytes, data.format); // PDF ( BASE64 )
          this.dataSourceSearchDocument.onChangeOpen(numint,false);
        }
      },
    });
  }

  onEdit(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint,false);
    this.modifyDocument.emit(numint);
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

  onSendEmail(numint: number) {
    this.globalStatusService.setLoading(true);
    setTimeout(() => {

    }, 1500);
    this.dataSourceSearchDocument.onChangeOpen(numint,false);
  }

  onSendSunat(numint: number) {
    this.globalStatusService.setLoading(true);
    setTimeout(() => {
      this.globalStatusService.setLoading(false);
    }, 1500);
    this.dataSourceSearchDocument.onChangeOpen(numint,false);
  }

  onViewTransactions(numint: number) {
    this.documentTransactionService.getByNumint(numint).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          this.dialog.open(DialogAllDocumentTransactionComponent, {
            data: {
              listDocumentTransaction: data.list,
            },
          });
        }
      },
      complete: () => {
        this.dataSourceSearchDocument.onChangeOpen(numint,false);
      },
    });
  }

  onApproved(numint: number) {
    this.documentInvoiceService.putApprovedDocument(numint).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          this.matSnackBar.openFromComponent(
            MatsnackbarSuccessComponent,
            MatSnackBarSuccessConfig
          );
          this.dataSourceSearchDocument.onChangeSituacion(numint, 2,'Approved');
        }
      },
      complete: () => {
        this.dataSourceSearchDocument.onChangeOpen(numint,false);
      },
    });
  }

  onInAccount(numint: number) {
    this.documentInvoiceService.putInAccountDocument(numint).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          this.matSnackBar.openFromComponent(
            MatsnackbarSuccessComponent,
            MatSnackBarSuccessConfig
          );
          this.dataSourceSearchDocument.onChangeSituacion(numint, 3,'On Acc.');
        }
      },
      complete: () => {
        this.dataSourceSearchDocument.onChangeOpen(numint,false);
      },
    });
  }

  onCancel(numint: number, row: SearchDocumentGeneric) {
    const dialogRef = this.dialog.open<DialogQuestionComment>(
      DialogQuestionCommentComponent,
      {
        width: '400px',
        data: {
          status: 1,
          message: `Are you sure to cancel the document ${row.serie} - ${row.numdoc}?`,
        },
      }
    );
    dialogRef.closed.subscribe((data) => {
      if (data && data.status) {
        this.documentInvoiceService
          .putCancelDocument(numint, data.commen)
          .subscribe({
            next: (data) => {
              if (data.status <= 0) {
                this.dialog.open(DialogErrorAlertComponent, {
                  width: '400px',
                  data: data,
                });
              } else {
                this.matSnackBar.openFromComponent(
                  MatsnackbarSuccessComponent,
                  MatSnackBarSuccessConfig
                );
                this.dataSourceSearchDocument.onChangeSituacion(numint, 4,'Canceled');
                this.dataSourceSearchDocument.onChangeOpen(numint,false);
              }
            }
          });
      }
    });
  }

  onDelete(numint: number, row: SearchDocumentGeneric) {
    const dialogRef = this.dialog.open<DialogQuestionComment>(
      DialogQuestionCommentComponent,
      {
        width: '400px',
        data: {
          status: 1,
          message: `Are you sure to delete the document ${row.serie} - ${row.numdoc}?`,
        },
      }
    );
    dialogRef.closed.subscribe((data) => {
      if (data && data.status) {
        this.documentInvoiceService
          .putDeleteDocument(numint, data.commen)
          .subscribe({
            next: (data) => {
              if (data.status <= 0) {
                this.dialog.open(DialogErrorAlertComponent, {
                  width: '400px',
                  data: data,
                });
              } else {
                this.matSnackBar.openFromComponent(
                  MatsnackbarSuccessComponent,
                  MatSnackBarSuccessConfig
                );
                this.dataSourceSearchDocument.onChangeSituacion(numint, 5,'Deleted');
                this.dataSourceSearchDocument.onChangeOpen(numint,false);
              }
            }
          });
      }
    });
  }

  onClose(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint,false);
  }

  copyToClipboard(value: string){
    this.clipboard.copy(value);
  }

  formatDate(date: number[]): String {
    const aux: Date = MyDate.convertToCustomDateShort(date);
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())) {
      return this.datePipe.transform(aux, 'dd/MM/yy') || '';
    }
    return '';
  }
}
