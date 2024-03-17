import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DocumentTransaction } from '@billing-models/document-transaction.model';
import { MyDate } from '@billing-utils/date';

interface DialogData{
  listDocumentTransaction: DocumentTransaction[]
}

@Component({
  selector: 'app-dialog-all-document-transaction',
  templateUrl: './dialog-all-document-transaction.component.html',
  styleUrls: ['./dialog-all-document-transaction.component.scss']
})
export class DialogAllDocumentTransactionComponent {

  listDocumentTransaction: DocumentTransaction[] = [];
  displayedColumns = ['index','createat','createby','observ','commen','impsaleprice','imptotal']

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {
    this.listDocumentTransaction = data.listDocumentTransaction
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date)
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
