import { Component, effect, EffectRef, EventEmitter, inject, Injector, Input, OnDestroy, OnInit, Output, runInInjectionContext } from '@angular/core';
import { faFileInvoice, faIndent } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { ChangeSerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { ConfigurationStatusService } from '@configuration/services/configuration-status.service';

@Component({
  selector: 'app-crud-serie-commercial-document',
  templateUrl: './crud-serie-commercial-document.component.html',
  styleUrls: ['./crud-serie-commercial-document.component.scss']
})
export class CrudSerieCommercialDocumentComponent implements OnDestroy {

  inputTypcomdoc: number | undefined
  inputSerie: string | undefined
  faFileInvoice = faFileInvoice
  faIndent = faIndent
  selectedTab = new FormControl()
  inputTypformat = 0
  saveEffect: EffectRef | undefined;
  injector = inject(Injector);

  constructor(
    private configurationStatusService: ConfigurationStatusService,
  ) {
    this.inputTypcomdoc = this.configurationStatusService.isStatusConfigurationEdit().data?.typcomdoc;
    this.inputSerie = this.configurationStatusService.isStatusConfigurationEdit().data?.serie;
  }

  ngOnDestroy() {
    this.saveEffect?.destroy();
  }

  onChangetypformat(typformat: number){
    this.inputTypformat = typformat
  }

  get isStatusConfigurationSave(): boolean{
    return this.configurationStatusService.isStatusConfigurationSave().status;
  }

}
