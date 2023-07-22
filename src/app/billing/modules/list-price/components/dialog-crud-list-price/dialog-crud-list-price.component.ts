import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFileInvoice,faClipboardCheck, faFileImport } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private dialogRef:DialogRef
  ){}

  closeDialog(){
    this.dialogRef.close()
  }

}
