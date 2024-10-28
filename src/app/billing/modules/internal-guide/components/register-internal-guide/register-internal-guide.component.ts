import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { DocumentInvoice } from "@billing-models/document-invoice.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataSourceDocumentHeader } from "@billing/data/datasource-facbol.service";
import { Currency, Reason, Serie } from "@auth/models/default-values.model";
import { Dialog } from "@angular/cdk/dialog";
import { ExchangeRateService } from "@billing-services/tipo-cambio.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DefaultValuesService } from "@auth/services/default-values.service";
import { DocumentInternalGuideService } from "@billing-services/document-internal-guide.service";
import { DOCUMENT_INTERNAL_GUIDE, MatSnackBarSuccessConfig } from "@billing-utils/constants";
import { DialogErrorAlertComponent } from "@shared/components/dialog-error-alert/dialog-error-alert.component";
import { MyDate } from "@billing-utils/date";
import { MatsnackbarSuccessComponent } from "@shared/components/matsnackbar-success/matsnackbar-success.component";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BusinessPartner } from "@billing-models/business-partner.model";
import {
  DialogGetClienteComponent
} from "@billing-module-business-partner/pages/dialog-get-cliente/dialog-get-cliente.component";

@Component({
  selector: 'app-register-internal-guide',
  templateUrl: './register-internal-guide.component.html',
  styleUrls: ['./register-internal-guide.component.scss']
})
export class RegisterInternalGuideComponent implements OnInit, OnChanges {
  @Input() isNewDocument = false;
  @Input() isEditDocumentValue: DocumentInvoice | undefined = undefined;
  @Input() isCalculateDocument = false;
  formDocumentHeader!: FormGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  dataHeaderSource = DataSourceDocumentHeader.getInstance();
  statusBuspar : 'register' | 'search' = 'register';

  // Obj
  series: Serie[];
  currencies: Currency[];
  reasons: Reason[];
  defaultSeries: Serie | undefined;
  defaultReason: Reason | undefined;

  private buildForm(
    numint: number | undefined,
    typcomdoc: number | undefined,
    serie: string | undefined,
    reacomdoc: number | undefined
  ) {
    this.dataHeaderSource.delReset();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toJSON()
      .split('T')[0];
    this.formDocumentHeader = this.formBuilder.group({
      numint: [numint, [Validators.required]],
      typcomdoc: [typcomdoc, [Validators.required]],
      sitcomdoc: [1, [Validators.required]],
      serie: [serie, [Validators.required]],
      numdoc: [0, [Validators.required]],
      registdate: [yesterday, [Validators.required]],
      codbranch: [1, [Validators.required]],
      codplaiss: [1, [Validators.required]],
      inout: [0, [Validators.required]],
      reacomdoc: [reacomdoc, [Validators.required]],
      codcur: ['PEN', [Validators.required]],
      exchangerate: [
        { value: (0.0).toFixed(2), disabled: true },
        [
          Validators.required,
          Validators.pattern(/^\d{1,4}(\.\d{1,4})?$/),
          Validators.min(0.01),
        ],
      ],
      codbuspar: ['', [Validators.required]],
      busnam: ['', [Validators.required]],
      addres: ['', [Validators.required]],
      poscod: ['000000', [Validators.required]],
      codlistprice: [0, [Validators.required]],
      codsel: ['0', [Validators.required]],
      typpaycon: ['0', [Validators.required]],
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
    private tipoCambioService: ExchangeRateService,
    private matSnackBar: MatSnackBar,
    private defaultValuesService: DefaultValuesService,
    private documentInternalGuideService: DocumentInternalGuideService
  ) {
    this.currencies =
      this.defaultValuesService.getLocalStorageValue('currencies');
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === DOCUMENT_INTERNAL_GUIDE);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === DOCUMENT_INTERNAL_GUIDE && data.inout === 0);
    this.defaultSeries = this.series.find((data) => data.defaul === 'Y');
    this.defaultReason = this.reasons.find((data) => data.defaul === 'Y');
    this.buildForm(
      0,
      DOCUMENT_INTERNAL_GUIDE,
      this.defaultSeries?.serie,
      this.defaultReason?.reacomdoc
    );
    if (!this.documentInternalGuideService.isStatusInternalGuideSave()) {
      this.formDocumentHeader.markAllAsTouched();
      if (!this.formDocumentHeader.valid) {
        this.documentInternalGuideService.setStatusInternalGuideRegister(
          false
        );
      } else {
        this.documentInternalGuideService.setStatusInternalGuideRegister(
          true
        );
      }
    }
  }

  ngOnInit(): void {
    this.onTipCamChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes2', changes);
    if (
      changes['isNewDocument'] &&
      changes['isNewDocument'].currentValue === true
    ) {
      this.buildForm(
        0,
        1,
        this.defaultSeries?.serie,
        this.defaultReason?.reacomdoc
      );
      this.formDocumentHeader.markAllAsTouched();
    }
    if (
      changes['isEditDocumentValue'] &&
      changes['isEditDocumentValue'].currentValue !== undefined
    ) {
      const dataHeaderDocument =
        changes['isEditDocumentValue'].currentValue.header;
      this.buildForm(
        dataHeaderDocument.numint,
        dataHeaderDocument.typcomdoc,
        dataHeaderDocument.serie,
        dataHeaderDocument.reacomdoc
      );
      this.dataHeaderSource.getInit(dataHeaderDocument);
      this.formDocumentHeader.patchValue({
        ...dataHeaderDocument,
        registdate: this.returnDate(dataHeaderDocument.registdate)
          .toISOString()
          .substring(0, 10),
      });
      this.disableHeaderForm();
      this.formDocumentHeader.markAllAsTouched();
    }
    if (
      changes['isCalculateDocument'] &&
      changes['isCalculateDocument'].currentValue === true
    ) {
      if (this.formDocumentHeader.invalid) {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { no_required_fields: 'Y' },
        });
        this.documentInternalGuideService.setStatusInternalGuideRegister(
          false
        );
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
    return MyDate.convertToCustomDateShort(date);
  }

  disableHeaderForm() {
    this.statusBuspar = 'register';
    this.formDocumentHeader.get('serie')?.disable();
    this.formDocumentHeader.get('codmot')?.disable();
    this.documentInternalGuideService.setStatusInternalGuideRegister(false);
    this.dataHeaderSource.getPush(this.formDocumentHeader.getRawValue());
  }

  changeTypcomdoc(event: any) {
    const typcomdoc: number = parseInt(event.target.value);
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === typcomdoc);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === typcomdoc && data.inout === 1);
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

  onTipCamChange() {
    this.documentInternalGuideService.setStatusInternalGuideRegister(false);
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
            this.documentInternalGuideService.setStatusInternalGuideRegister(
              false
            );
          } else {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.formDocumentHeader
              .get('exchangerate')
              ?.setValue(data.list[0].eventa);
            this.documentInternalGuideService.setStatusInternalGuideRegister(
              true
            );
            this.dataHeaderSource.updateData(
              'exchangerate',
              data.list[0].eventa
            );
          }
        },
        error: (err) => {
          this.formDocumentHeader
            .get('exchangerate')
            ?.setValue((0.0).toFixed(2));
          this.documentInternalGuideService.setStatusInternalGuideRegister(
            false
          );
        }
      });
    }

  openDialogGetCli(isCode: boolean) {
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
          message: 'Document Type, Series and Reason are Required!',
        },
      });
      return;
    }
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
    const dialogRef = this.dialog.open<BusinessPartner>(
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
        this.formDocumentHeader.get('codlistprice')?.setValue(1); // Default
        this.disableHeaderForm();
      }
    });
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
    this.documentInternalGuideService.setStatusInternalGuideRegister(false);
    this.dataHeaderSource.getPush(this.formDocumentHeader.getRawValue());
  }

  protected readonly DOCUMENT_INTERNAL_GUIDE = DOCUMENT_INTERNAL_GUIDE;
}
