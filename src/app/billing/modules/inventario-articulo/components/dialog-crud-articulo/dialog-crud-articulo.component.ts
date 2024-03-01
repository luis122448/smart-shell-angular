import { Component, Inject } from '@angular/core';
import { faFileInvoice,faClipboardCheck, faShoppingBag, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ArticleBasic } from '@billing-models/article.model';

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
    @Inject(DIALOG_DATA) private data: ArticleBasic
  ){
    this.isNewArticle = data.isNewArticle
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
