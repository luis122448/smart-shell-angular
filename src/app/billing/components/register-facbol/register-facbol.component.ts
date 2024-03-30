import { Component, Input, OnInit } from '@angular/core';
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
import { DocumentHeader } from '@billing-models/document-header.model';
import { DocumentInvoice } from '@billing-models/document-invoice.model';
import { MyDate } from '@billing-utils/date';

@Component({
  selector: 'app-register-facbol',
  templateUrl: './register-facbol.component.html',
  styleUrls: ['./register-facbol.component.scss'],
})
export class RegisterFacbolComponent implements OnInit {
  @Input() isNewDocument = false;
  @Input() isEditDocumentValue: DocumentInvoice | undefined = undefined;
  @Input() isCalculateDocument = false;
  formDocumentHeader!: FormGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  dataHeaderSource = DataSourceDocumentHeader.getInstance();
  statusBuspar : 'search' | 'register' | 'disabled' = 'search'

  // Obj
  tipoConPag: IntcomCondicionPagoView[] = [];
  series: Serie[];
  sellers: Seller[];
  currencies: Currency[];
  reasons: Reason[];
  defaultSeries: Serie | undefined;
  defaultReason: Reason | undefined;

  private buildForm(
    typcomdoc: number | undefined,
    serie: string | undefined,
    reacomdoc: number | undefined
  ) {
    // Clear Data
    this.dataHeaderSource.delReset();
    // Init Form
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toJSON()
      .split('T')[0];
    this.formDocumentHeader = this.formBuilder.group({
      typcomdoc: [typcomdoc, [Validators.required]],
      sitcomdoc: [1, [Validators.required]],
      serie: [serie, [Validators.required]],
      numdoc: [0, [Validators.required]],
      registdate: [yesterday, [Validators.required]],
      codbranch: [1, [Validators.required]],
      codplaiss: [1, [Validators.required]],
      ingsalcom: [1, [Validators.required]],
      reacomdoc: [reacomdoc, [Validators.required]],
      codcur: ['PEN', [Validators.required]],
      exchangerate: [
        { value: (0.0).toFixed(2), disabled: true },
        [Validators.required, Validators.pattern(/^\d{1,4}(\.\d{1,4})?$/), Validators.min(0.01)],
      ],
      codbuspar: ['', [Validators.required]],
      busnam: ['', [Validators.required]],
      addres: ['', [Validators.required]],
      poscod: ['000000', [Validators.required]],
      codlistprice: [0, [Validators.required]],
      codsel: ['', [Validators.required]],
      typpaycon: ['', [Validators.required]],
      incigv: [1, [Validators.required]],
      tasigv: [
        { value: (18.0).toFixed(2), disabled: true },
        [Validators.required],
      ],
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
    this.sellers = this.defaultValuesService.getLocalStorageValue('sellers');
    this.currencies =
      this.defaultValuesService.getLocalStorageValue('currencies');
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === 1);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === 1 && data.ingsalcom === 1);
    this.defaultSeries = this.series.find((data) => data.defaul === 'Y');
    this.defaultReason = this.reasons.find((data) => data.defaul === 'Y');
    this.buildForm(1, this.defaultSeries?.serie, this.defaultReason?.reacomdoc);
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
        this.formDocumentHeader.markAllAsTouched();
      },
    });
  }

  ngOnChanges() {
    if (this.isNewDocument) {
      this.buildForm(1, this.defaultSeries?.serie, this.defaultReason?.reacomdoc);
      this.formDocumentHeader.markAllAsTouched();
    }
    if (this.isEditDocumentValue) {
      const dataHeaderDocument = this.isEditDocumentValue.header;
      console.log('dataHeaderDocument', dataHeaderDocument);
      this.dataHeaderSource.getInit(dataHeaderDocument);
      this.formDocumentHeader.patchValue({
        ...dataHeaderDocument,
        registdate: this.returnDate(dataHeaderDocument.registdate)
          .toISOString()
          .substring(0, 10),
      });
      this.changePaymentCondition(dataHeaderDocument.codbuspar);
      this.disableHeaderForm();
      this.formDocumentHeader.markAllAsTouched();
    }
    if (this.isCalculateDocument) {
      if(this.formDocumentHeader.invalid){
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { no_required_fields : 'Y' }
        });
        this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
        this.globalStatusService.setLoading(false);
        return;
      }
    }
  }

    isInputInvalid(fieldName: string): boolean {
      const field = this.formDocumentHeader.get(fieldName);
      return field ? field.invalid && field.touched : true;
    }

  returnDate(date: number[] | Date): Date {
    if (date instanceof Date) {
      return date;
    }
    const aux: Date = MyDate.convertToCustomDateShort(date);
    return aux;
  }

  openDialogGetCli(isCode: boolean) {
    // Validar que los campos obligatorios estén llenos
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
    // Validad minima cantidad de digitos
    if (isCode && this.formDocumentHeader.get('codbuspar')?.value.length < 3) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { minimum_length: 3 },
      });
      return;
    }
    if (!isCode && this.formDocumentHeader.get('busnam')?.value.length < 3) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { minimum_length: 3 },
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
        this.changePaymentCondition(data.codbuspar);
        // Deshabilitar todos los inputs
        this.disableHeaderForm();
      }
    });
  }

  disableHeaderForm() {
    this.statusBuspar = 'register';
    this.formDocumentHeader.get('typcomdoc')?.disable();
    this.formDocumentHeader.get('serie')?.disable();
    this.formDocumentHeader.get('codmot')?.disable();
    this.formDocumentHeader.get('codbuspar')?.disable();
    this.formDocumentHeader.get('busnam')?.disable();
    this.formDocumentHeader.get('addres')?.disable();
    this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
    this.dataHeaderSource.getPush(this.formDocumentHeader.getRawValue());
  }

  cleanBuspar() {
    this.statusBuspar = 'search';
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
    this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
    this.dataHeaderSource.getPush(this.formDocumentHeader.getRawValue());
  }

  changePaymentCondition(codbuspar: string) {
    this.globalStatusService.setLoading(true);
    this.businessPartnerService
      .getByCodintcomCondicionPago(codbuspar)
      .subscribe({
        next: (data) => {
          if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          this.tipoConPag = data.list;
          this.globalStatusService.setLoading(false);
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
        },
        complete: () => this.globalStatusService.setLoading(false),
      });
  }

  changeTypcomdoc(event: any) {
    const typcomdoc: number = parseInt(event.target.value);
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === typcomdoc);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === typcomdoc && data.ingsalcom === 1);
  }

  onIncigvChange(event: any) {
    const incigv = event.target.value;
    if (incigv === '0') {
      this.formDocumentHeader.get('tasigv')?.setValue((0.0).toFixed(2));
    } else {
      this.formDocumentHeader.get('tasigv')?.setValue((18.0).toFixed(2));
    }
    this.dataHeaderSource.updateData('incigv', incigv);
  }

  onCodcurChange(event: any) {
    const codcur = event.target.value;
    this.dataHeaderSource.updateData('codcur', codcur);
    this.onTipCamChange();
  }

  onFemisiChange(event: any) {
    const registdate: Date = event.target.value;
    this.dataHeaderSource.updateData('registdate', registdate);
    this.onTipCamChange();
  }

  onCodselChange(event: any) {
    const codsel = event.target.value;
    this.dataHeaderSource.updateData('codsel', codsel);
  }

  onTyppayconChange(event: any) {
    const typpaycon = event.target.value;
    this.dataHeaderSource.updateData('typpaycon', typpaycon);
  }

  onTipCamChange() {
    this.globalStatusService.setLoading(true);
    this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
    this.tipoCambioService
      .getByLike(
        this.formDocumentHeader.get('registdate')?.value,
        this.formDocumentHeader.get('registdate')?.value,
        'PEN',
        'USD'
      )
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
            this.formDocumentHeader
              .get('exchangerate')
              ?.setValue((0.0).toFixed(2));
            this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          } else {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.formDocumentHeader
              .get('exchangerate')
              ?.setValue(data.list[0].eventa);
            this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
            this.dataHeaderSource.updateData(
              'exchangerate',
              data.list[0].eventa
            );
          }
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.formDocumentHeader
            .get('exchangerate')
            ?.setValue((0.0).toFixed(2));
          this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          this.globalStatusService.setLoading(false);
        },
        complete: () => this.globalStatusService.setLoading(false),
      });
  }
}
