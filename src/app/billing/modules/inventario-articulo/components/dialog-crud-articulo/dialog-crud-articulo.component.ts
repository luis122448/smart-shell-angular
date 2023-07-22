import { Component } from '@angular/core';
import { faFileInvoice,faClipboardCheck, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
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
  selectedTab = new FormControl()
}
