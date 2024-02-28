import { Component } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { TypeCommercialDocumentService } from '@billing-services/type-commercial-document.service';
import { TypeInventoryService } from '@billing-services/type-inventory.service';
import { SellerService } from '@billing-services/vendedor.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { catchError, forkJoin, of } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { SituationCommercialDocumentService } from '@billing-services/situation-commercial-document.service';

@Component({
  selector: 'app-default-values',
  templateUrl: './default-values.component.html',
  styleUrls: ['./default-values.component.scss'],
})
export class DefaultValuesComponent {
  constructor(
    private globalStatusService: GlobalStatusService,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    // Default-Values
    private sellerService: SellerService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private reasonCommercialDocumentService: ReasonCommercialDocumentService,
    private situationCommercialDocumentService: SituationCommercialDocumentService,
    private typeInventoryService: TypeInventoryService,
    private typeCommercialDocumentService: TypeCommercialDocumentService,
  ) {}

  onUploadDefaultValues() {
    this.globalStatusService.setLoading(true);
    this.defaultValuesService.removeAllCookiesExceptSpecified();
    // Realiza todas las llamadas en paralelo
    forkJoin([
      this.sellerService.getAll().pipe(catchError(this.handleError)),
      this.serieCommercialDocumentService
        .getAll()
        .pipe(catchError(this.handleError)),
      this.reasonCommercialDocumentService
        .getAll()
        .pipe(catchError(this.handleError)),
      this.typeInventoryService.getAll().pipe(catchError(this.handleError)),
      this.typeCommercialDocumentService
        .getAll()
        .pipe(catchError(this.handleError)),
      this.situationCommercialDocumentService
        .getAll()
        .pipe(catchError(this.handleError)),
    ]).subscribe((results: any[]) => {
      // Procesa los resultados después de que todas las llamadas se completen
      // 'results' es un array con los resultados de cada llamada
      this.processResult('sellers', results[0]);
      this.processResult('series', results[1]);
      this.processResult('reasons', results[2]);
      this.processResult('inventories', results[3]);
      this.processResult('documents', results[4]);
      this.processResult('situations', results[5]);
      this.globalStatusService.setLoading(false); // Finaliza la carga después de procesar los datos
    });
  }

  // Método para procesar y almacenar los datos
  processResult(cookieName: string, data: any) {
    if (data?.list) {
      // this.defaultValuesService.setCookieValue(
      //   cookieName,
      //   data.list.map((item: any) => this.mapData(item, cookieName))
      // );
      this.defaultValuesService.setLocalStorageValue(
        cookieName,
        data.list.map((item: any) => this.mapData(item, cookieName))
      );
    }
  }

  handleError(error: any) {
    this.dialog.open(DialogErrorAlertComponent, {
      width: '400px',
      data: error,
    });
    // Retorna un observable de un solo valor para continuar el flujo
    return of(null);
  }

  // Mapea los datos según la cookie a almacenar
  mapData(data: any, cookieName: string): any {
    switch (cookieName) {
      case 'sellers':
        return {
          codsel: data.codsel,
          abrevi: data.abrevi,
          descri: data.descri,
        };
      case 'series':
        return {
          typcomdoc: data.typcomdoc,
          serie: data.serie,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      case 'reasons':
        return {
          typcomdoc: data.typcomdoc,
          ingsalcom: data.ingsalcom,
          reacomdoc: data.reacomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      case 'inventories':
        return {
          typinv: data.typinv,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      case 'documents':
        return {
          typcomdoc: data.typcomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: 'N',
        };
      case 'situations':
        return {
          typcomdoc: data.typcomdoc,
          sitcomdoc: data.sitcomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: 'N',
        };
      default:
        return null;
    }
  }
}
