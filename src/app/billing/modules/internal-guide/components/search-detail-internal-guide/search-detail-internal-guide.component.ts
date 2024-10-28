import { Component, EventEmitter, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Dialog } from "@angular/cdk/dialog";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DocumentInternalGuideService } from "@billing-services/document-internal-guide.service";
import { DocumentTransactionService } from "@billing-services/document-transaction.service";
import { Clipboard } from "@angular/cdk/clipboard";
import { DialogErrorAlertComponent } from "@shared/components/dialog-error-alert/dialog-error-alert.component";
import { MatsnackbarSuccessComponent } from "@shared/components/matsnackbar-success/matsnackbar-success.component";
import { MatSnackBarSuccessConfig } from "@billing-utils/constants";
import {
  DialogAllDocumentTransactionComponent
} from "@billing-components/dialog-all-document-transaction/dialog-all-document-transaction.component";
import { SearchDocumentGeneric } from "@billing-models/document-invoice.model";
import {
  DialogQuestionComment
} from "@billing-module-invoice-receipt/components/search-detail-invoice-receipt/search-detail-invoice-receipt.component";
import {
  DialogQuestionCommentComponent
} from "@shared/components/dialog-question-comment/dialog-question-comment.component";
import { MyDate } from "@billing-utils/date";
import { faBan, faBuildingColumns, faEnvelope, faPrint, faRectangleList, faFilePen, faList, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  DataSourceSearchDocumentInternalGuide
} from "@billing-module-internal-guide/components/search-internal-guide/search-internal-guide.component";

@Component({
  selector: 'app-search-detail-internal-guide',
  templateUrl: './search-detail-internal-guide.component.html',
  styleUrls: ['./search-detail-internal-guide.component.scss']
})
export class SearchDetailInternalGuideComponent {
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
  dataSourceSearchDocument = DataSourceSearchDocumentInternalGuide.getInstance();

  constructor(
    private dialog: Dialog,
    private datePipe: DatePipe,
    private matSnackBar: MatSnackBar,
    private documentInternalGuideService: DocumentInternalGuideService,
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
    this.documentInternalGuideService.getPrintDocument(numint).subscribe({
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

  onSentKardex(numint: number) {
    this.documentInternalGuideService.putSentKardexDocument(numint).subscribe({
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
          this.dataSourceSearchDocument.onChangeSituacion(numint, 2,'In Kardex');
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
        this.documentInternalGuideService
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
