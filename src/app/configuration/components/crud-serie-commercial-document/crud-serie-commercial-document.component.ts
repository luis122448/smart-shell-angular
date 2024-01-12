import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFileInvoice, faIndent } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { ChangeSerieCommercialDocument } from '@billing-models/serie-commercial-document.model';

@Component({
  selector: 'app-crud-serie-commercial-document',
  templateUrl: './crud-serie-commercial-document.component.html',
  styleUrls: ['./crud-serie-commercial-document.component.scss']
})
export class CrudSerieCommercialDocumentComponent {

  @Input() inputTypcomdoc: number = 0
  @Input() inputSerie: string = ''
  @Input() inputSave: boolean = false
  @Output() changeView = new EventEmitter<ChangeSerieCommercialDocument>();

  faFileInvoice = faFileInvoice
  faIndent = faIndent
  selectedTab = new FormControl()

}
