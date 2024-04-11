import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DocumentTransactionService } from '@billing-services/document-transaction.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DataSourceSearchDocumentInvoice } from '@billing/components/search-facbol/search-facbol.component';
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
import { DialogAllDocumentTransactionComponent } from '../dialog-all-document-transaction/dialog-all-document-transaction.component';
import { DialogQuestionCommentComponent } from '@shared/components/dialog-question-comment/dialog-question-comment.component';
import { SearchDocumentInvoice } from '@billing-models/document-invoice.model';
import { Clipboard } from '@angular/cdk/clipboard';

export interface DialogQuestionComment {
  status: boolean;
  commen: string;
}

@Component({
  selector: 'app-detail-search-invoice',
  templateUrl: './detail-search-invoice.component.html',
  styleUrls: ['./detail-search-invoice.component.scss'],
})
export class DetailSearchInvoiceComponent {
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

  dataSourceSearchDocument = DataSourceSearchDocumentInvoice.getInstance();

  constructor(
    private dialog: Dialog,
    private datePipe: DatePipe,
    private matSnackBar: MatSnackBar,
    private documentInvoiceService: DocumentInvoiceService,
    private documentTransactionService: DocumentTransactionService,
    private globalStatusService: GlobalStatusService,
    private clipboard: Clipboard
  ) {}

  byPageEvent(e: PageEvent) {
    this.pageEvent.emit(e);
  }

  onOpenOverlay(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint);
  }

  onPrint(numint: number) {
    this.globalStatusService.setLoading(true);
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
          this.dataSourceSearchDocument.onChangeOpen(numint);
        }
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
      },
      complete: () => this.globalStatusService.setLoading(false),
    });
  }

  onEdit(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint);
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
      this.globalStatusService.setLoading(false);
    }, 1500);
    this.dataSourceSearchDocument.onChangeOpen(numint);
  }

  onSendSunat(numint: number) {
    this.globalStatusService.setLoading(true);
    setTimeout(() => {
      this.globalStatusService.setLoading(false);
    }, 1500);
    this.dataSourceSearchDocument.onChangeOpen(numint);
  }

  onViewTransactions(numint: number) {
    this.globalStatusService.setLoading(true);
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
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
      },
      complete: () => this.globalStatusService.setLoading(false),
    });
  }

  onApproved(numint: number) {
    this.globalStatusService.setLoading(true);
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
          this.dataSourceSearchDocument.onChangeOpen(numint);
        }
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
      },
      complete: () => this.globalStatusService.setLoading(false),
    });
  }

  onInAccount(numint: number) {
    this.globalStatusService.setLoading(true);
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
          this.dataSourceSearchDocument.onChangeOpen(numint);
        }
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
      },
      complete: () => this.globalStatusService.setLoading(false),
    });
  }

  onCancel(numint: number, row: SearchDocumentInvoice) {
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
        this.globalStatusService.setLoading(true);
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
                this.dataSourceSearchDocument.onChangeOpen(numint);
              }
            },
            error: (err) => {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: err.error,
              });
              this.globalStatusService.setLoading(false);
            },
            complete: () => this.globalStatusService.setLoading(false),
          });
      }
    });
  }

  onDelete(numint: number, row: SearchDocumentInvoice) {
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
        this.globalStatusService.setLoading(true);
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
                this.dataSourceSearchDocument.onChangeOpen(numint);
              }
            },
            error: (err) => {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: err.error,
              });
              this.globalStatusService.setLoading(false);
            },
            complete: () => this.globalStatusService.setLoading(false),
          });
      }
    });
  }

  onClose(numint: number) {
    this.dataSourceSearchDocument.onChangeOpen(numint);
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
