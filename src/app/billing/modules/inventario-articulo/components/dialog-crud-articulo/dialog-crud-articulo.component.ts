import { Component, Inject } from '@angular/core';
import { faFileInvoice,faClipboardCheck, faShoppingBag, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

interface DialogData {
  typinv: number,
  codart: string,
  descri: string,
  articulo: any,
  newArticle: boolean
}

@Component({
  selector: 'app-dialog-crud-articulo',
  templateUrl: './dialog-crud-articulo.component.html',
  styleUrls: ['./dialog-crud-articulo.component.scss']
})
export class DialogCrudArticleComponent{

  faFileInvoice = faFileInvoice
  faClipboardCheck = faClipboardCheck
  faShoppingBag = faShoppingBag
  faFolderOpen = faFolderOpen
  selectedTab = new FormControl()
  isNewArticle = false

  constructor(
    private dialogRef:DialogRef,
    @Inject(DIALOG_DATA) private data: DialogData
  ){
    this.isNewArticle = data.newArticle
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
