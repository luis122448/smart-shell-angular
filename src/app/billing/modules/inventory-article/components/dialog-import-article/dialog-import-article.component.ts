import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFileInvoice,faClipboardCheck, faFileImport } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-import-article',
  templateUrl: './dialog-import-article.component.html',
  styleUrls: ['./dialog-import-article.component.scss']
})
export class DialogImportArticleComponent {
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
