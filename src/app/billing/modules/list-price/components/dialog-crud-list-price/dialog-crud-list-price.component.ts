import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFileInvoice,faClipboardCheck, faFileImport } from '@fortawesome/free-solid-svg-icons';

interface DialogData {
  listPrice: any,
  isNewListPrice: boolean
}

@Component({
  selector: 'app-dialog-crud-list-price',
  templateUrl: './dialog-crud-list-price.component.html',
  styleUrls: ['./dialog-crud-list-price.component.scss']
})
export class DialogCrudListPriceComponent {

  faFileInvoice = faFileInvoice
  faClipboardCheck = faClipboardCheck
  faFileImport = faFileImport
  selectedTab = new FormControl()
  isNewListPrice = false

  constructor(
    private dialogRef:DialogRef,
    @Inject(DIALOG_DATA) public data:DialogData
  ){
    this.isNewListPrice = data.isNewListPrice
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
