import { Component } from '@angular/core';
import { faFileInvoice,faClipboardCheck, faShoppingBag, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

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
}
