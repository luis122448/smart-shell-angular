import { Component } from '@angular/core';
import { ChangeSerieCommercialDocument } from '@billing-models/serie-commercial-document.model';

@Component({
  selector: 'app-layout-serie-commercial-document',
  templateUrl: './layout-serie-commercial-document.component.html',
  styleUrls: ['./layout-serie-commercial-document.component.scss']
})
export class LayoutSerieCommercialDocumentComponent {

  isLoading =  false;
  isStatusConfiguration : 'search' | 'crud' =  'search'
  typcomdoc: number = 0
  serie: string = ''
  save: boolean = false
  title: string = 'Serie Commercial Document'

  // Método para cambiar entre vistas
  changeView(data: ChangeSerieCommercialDocument): void {
    this.isStatusConfiguration = data.view
    this.typcomdoc = data.typcomdoc
    this.serie = data.serie
  }

  changeViewOnly(data: 'search' | 'crud'): void {
    this.isStatusConfiguration = data
  }

  changeSave($event: boolean): void{
    this.save = $event
  }

}
