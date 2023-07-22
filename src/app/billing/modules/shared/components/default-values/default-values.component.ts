import { Component } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { TypeInventoryService } from '@billing-services/type-inventory.service';
import { SellerService } from '@billing-services/vendedor.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-default-values',
  templateUrl: './default-values.component.html',
  styleUrls: ['./default-values.component.scss']
})
export class DefaultValuesComponent {

  constructor(
      private globalStatusService:GlobalStatusService,
      private defaultValuesService:DefaultValuesService,
      // Default-Values
      private sellerService:SellerService,
      private serieCommercialDocumentService:SerieCommercialDocumentService,
      private reasonCommercialDocumentService: ReasonCommercialDocumentService,
      private typeInventoryService:TypeInventoryService
  ){}

  async onUploadDefaultValues(){
    this.globalStatusService.setLoading(true);

    await this.sellerService.getAll()
      .subscribe({
        next:data =>{
          if (data.list) {
            this.defaultValuesService.setCookieValue('sellers', data.list.map(data => {
              return {
                codsel: data.codsel,
                abrevi: data.abrevi,
                descri: data.descri
              };
            }));
          }
        }
      });

    await this.serieCommercialDocumentService.getAll()
      .subscribe({
        next:data =>{
          if (data.list) {
            this.defaultValuesService.setCookieValue('series', data.list.map(data => {
              return {
                typcomdoc: data.typcomdoc,
                serie: data.serie,
                abrevi: data.abrevi,
                descri: data.descri
              };
            }));
          }
        }
      });

    await this.reasonCommercialDocumentService.getAll()
      .subscribe({
        next:data =>{
          if (data.list) {
            this.defaultValuesService.setCookieValue('reasons', data.list.map(data => {
              return {
                typcomdoc: data.typcomdoc,
                ingsalcom: data.ingsalcom,
                reacomdoc: data.reacomdoc,
                abrevi: data.abrevi,
                descri: data.descri
              };
            }));
          }
        }
      });

    await this.typeInventoryService.getAll()
      .subscribe({
        next:data =>{
          if (data.list) {
            this.defaultValuesService.setCookieValue('inventories', data.list.map(data => {
              return {
                typinv: data.typinv,
                abrevi: data.abrevi,
                descri: data.descri,
                defaul: data.defaul
              };
            }));
          }
        }
      });

    this.globalStatusService.setLoading(false);
  }

}
