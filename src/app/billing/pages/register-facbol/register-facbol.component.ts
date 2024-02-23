import { Component, OnInit } from '@angular/core';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DialogGetClienteComponent } from '../../modules/interlocutor-comercial/page/dialog-get-cliente/dialog-get-cliente.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BusinessPartnerService } from '../../services/interlocutor-comcercial.service';
import {
  IntcomCondicionPagoView,
  InterlocutorComercial,
} from '../../models/interlocutor-comercial.model';
import { DataSourceDocumentHeader } from '../../data/datasource-facbol.service';
import { ExchangeRateService } from '../../services/tipo-cambio.service';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import {
  MatSnackBarSuccessConfig,
  NoDataFoundMessageDialog,
} from '../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { GlobalStatusService } from '../../services/global-status.service';
import { FacbolGlobalStatusService } from '../../services/facbol-global-status.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import {
  Currency,
  Reason,
  Seller,
  Serie,
} from 'src/app/auth/models/default-values.model';

@Component({
  selector: 'app-register-facbol',
  templateUrl: './register-facbol.component.html',
  styleUrls: ['./register-facbol.component.scss'],
})
export class RegisterFacbolComponent implements OnInit {
  formDocumentHeader!: FormGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  // DataSource
  dataSource = DataSourceDocumentHeader.getInstance();
  // SubStatus
  statusBuspar = false;

  // Obj
  tipoConPag: IntcomCondicionPagoView[] = [];
  series: Serie[];
  sellers: Seller[];
  currencies: Currency[];
  reasons: Reason[];

  private buildForm(
    typcomdoc: number | undefined,
    serie: string | undefined,
    reacomdoc: number | undefined
  ) {
    const today = new Date().toJSON().split('T')[0]
    this.formDocumentHeader = this.formBuilder.group({
      typcomdoc: [typcomdoc, [Validators.required]],
      sitcomdoc: [1, [Validators.required]],
      serie: [serie, [Validators.required]],
      numdoc: [0, [Validators.required]],
      registdate: [today, [Validators.required]],
      codbranch: [1, [Validators.required]],
      codplaiss: [1, [Validators.required]],
      ingsalcom: [1, [Validators.required]],
      reacomdoc: [reacomdoc, [Validators.required]],
      codcur: ['PEN', [Validators.required]],
      exchangerate: [
        0,
        [Validators.required, Validators.pattern(/^\d{1,4}(\.\d{1,4})?$/)],
      ],
      codbuspar: ['', [Validators.required]],
      busnam: ['', [Validators.required]],
      addres: ['', [Validators.required]],
      poscod: ['000000', [Validators.required]],
      codlistprice: [0, [Validators.required]],
      codsel: ['', [Validators.required]],
      typpaycon: [1, [Validators.required]],
      incigv: [1, [Validators.required]],
      tasigv: [18.0, [Validators.required]],
      refere: ['', []],
      observ: ['', []],
      commen: ['', []],
    });
  }

  constructor(
    private dialog: Dialog,
    private formBuilder: FormBuilder,
    private businessPartnerService: BusinessPartnerService,
    private tipoCambioService: ExchangeRateService,
    private matSnackBar: MatSnackBar,
    private globalStatusService: GlobalStatusService,
    private facbolGlobalStatusService: FacbolGlobalStatusService,
    private defaultValuesService: DefaultValuesService
  ) {
    this.series = this.defaultValuesService
      .getCookieValue('series')
      .filter((data) => data.typcomdoc === 1);
    this.sellers = this.defaultValuesService.getCookieValue('sellers');
    this.currencies = this.defaultValuesService.getCookieValue('currencies');
    this.reasons = this.defaultValuesService
      .getCookieValue('reasons')
      .filter((data) => data.typcomdoc === 1 && data.ingsalcom === 1);
    const defaultSeries = this.series.find((data) => data.defaul === 'Y');
    const defaultReason = this.reasons.find((data) => data.defaul === 'Y');
    this.buildForm(1, defaultSeries?.serie, defaultReason?.reacomdoc);
  }

  ngOnInit(): void {
    this.onTipCamChange();
    this.facbolGlobalStatusService.isStatusInvoiceSave$.subscribe({
      next: (data) => {
        if (!data) {
          this.formDocumentHeader.markAllAsTouched();
          if (!this.formDocumentHeader.valid) {
            this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          } else {
            this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
          }
        }
      },
      error: (error) => {
        console.log(error);
        this.formDocumentHeader.markAllAsTouched();
      },
    });
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formDocumentHeader.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  openDialogGetCli() {
    if (
      !(
        this.formDocumentHeader.get('typcomdoc')?.value &&
        this.formDocumentHeader.get('serie')?.value &&
        this.formDocumentHeader.get('reacomdoc')?.value
      )
    ) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: {
          status: -3,
          message: 'Tipo de Documento, Serie y Motivo son Obligatorio!',
        },
      });
      return;
    }
    const dialogRef = this.dialog.open<InterlocutorComercial>(
      DialogGetClienteComponent,
      {
        data: {
          codbuspar: this.formDocumentHeader.get('codbuspar')?.value,
          busnam: this.formDocumentHeader.get('busnam')?.value,
        },
      }
    );

    dialogRef.closed.subscribe((data) => {
      if (data) {
        this.formDocumentHeader.get('codbuspar')?.setValue(data.codbuspar);
        this.formDocumentHeader.get('busnam')?.setValue(data.busnam);
        this.formDocumentHeader.get('addres')?.setValue(data.addres);
        this.formDocumentHeader.get('poscod')?.setValue(data.poscod);
        // this.formDocumentHeader.get('codlistprice')?.setValue(data.codlistprice)
        this.formDocumentHeader.get('codlistprice')?.setValue(1); // Default
        // Asignar las Condiciones Pago
        this.businessPartnerService
          .getByCodintcomCondicionPago(data.codbuspar)
          .subscribe((data) => {
            this.tipoConPag = data.list;
          });
        // Guardar en DataSource
        const dataHeader = this.formDocumentHeader.value;

        // Deshabilitar todos los inputs
        this.formDocumentHeader.get('typcomdoc')?.disable();
        this.formDocumentHeader.get('serie')?.disable();
        this.formDocumentHeader.get('codmot')?.disable();
        this.formDocumentHeader.get('codbuspar')?.disable();
        this.formDocumentHeader.get('busnam')?.disable();
        this.formDocumentHeader.get('addres')?.disable();
        this.statusBuspar = true;
        if (this.formDocumentHeader.get('addres')?.value === 0) {
          this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
        } else {
          this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
        }
        // Update values in DataSource
        console.log('formValue', dataHeader);
        this.dataSource.getPush(dataHeader);
      }
    });
  }

  cleanBuspar() {
    this.formDocumentHeader.get('codbuspar')?.setValue('');
    this.formDocumentHeader.get('busnam')?.setValue('');
    this.formDocumentHeader.get('addres')?.setValue('');
    // Habilitar todos los inputs
    this.formDocumentHeader.get('typcomdoc')?.enable();
    this.formDocumentHeader.get('serie')?.enable();
    this.formDocumentHeader.get('codmot')?.enable();
    this.formDocumentHeader.get('codbuspar')?.enable();
    this.formDocumentHeader.get('busnam')?.enable();
    this.formDocumentHeader.get('addres')?.enable();
    this.dataSource.getPush(this.formDocumentHeader.value);
    this.statusBuspar = false;
    this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
  }

  changeTypcomdoc(event: any) {
    const typcomdoc: number = parseInt(event.target.value);
    this.series = this.defaultValuesService
      .getCookieValue('series')
      .filter((data) => data.typcomdoc === typcomdoc);
    this.reasons = this.defaultValuesService
      .getCookieValue('reasons')
      .filter((data) => data.typcomdoc === typcomdoc && data.ingsalcom === 1);
  }

  onIncigvChange(event: any) {
    const incigv = event.target.value;
    if (incigv === 'N') {
      this.formDocumentHeader.get('tasigv')?.setValue(0.0);
    } else {
      this.formDocumentHeader.get('tasigv')?.setValue(18.0);
    }
    this.dataSource.updateData('incigv', incigv);
  }

  onCodcurChange(event: any) {
    const codcur = event.target.value;
    this.dataSource.updateData('codcur', codcur);
    this.onTipCamChange();
  }

  onFemisiChange(event: any) {
    const registdate: Date = event.target.value;
    this.dataSource.updateData('registdate', registdate);
    this.onTipCamChange();
  }

  onTipCamChange() {
    this.globalStatusService.setLoading(true);
    this.tipoCambioService
      .getByLike(
        this.formDocumentHeader.get('registdate')?.value,
        this.formDocumentHeader.get('registdate')?.value,
        'PEN',
        'USD'
      )
      .subscribe({
        next: (data) => {
          var newTipcam = 0;
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: { status: data.status, message: data.message },
            });
            this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          } else {
            if (data.list.length === 0) {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: {
                  status: -1,
                  message:
                    'No existe tipo de cambio, para la registdate seleccionada',
                },
              });
              this.formDocumentHeader.get('exchangerate')?.setValue(0);
              this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
            } else {
              this.matSnackBar.openFromComponent(
                MatsnackbarSuccessComponent,
                MatSnackBarSuccessConfig
              );
              newTipcam = data.list[0].eventa;
              this.formDocumentHeader.get('exchangerate')?.enable();
              this.formDocumentHeader.get('exchangerate')?.setValue(newTipcam);
              this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
              this.formDocumentHeader.get('exchangerate')?.disable();
            }
          }
          this.dataSource.updateData('exchangerate', newTipcam);
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
        },
        complete: () => this.globalStatusService.setLoading(false),
      });
  }
}
