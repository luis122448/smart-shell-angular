import { Component, signal } from '@angular/core';
import { ConfigurationStatusService } from '@configuration/services/configuration-status.service';

@Component({
  selector: 'app-layout-serie-commercial-document',
  templateUrl: './layout-serie-commercial-document.component.html',
  styleUrls: ['./layout-serie-commercial-document.component.scss']
})
export class LayoutSerieCommercialDocumentComponent {

  isSave = signal<boolean>(false)
  isEdit = signal<boolean>(false)
  typcomdoc: number = 0
  serie: string = ''
  title: string = 'Serie Commercial Document'

  constructor(
    private configurationStatusService: ConfigurationStatusService,
  ) { }

  get isStatusConfiguration(){
    return this.configurationStatusService.isStatusConfiguration;
  }

}
