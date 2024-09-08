import { Component, Input, SimpleChanges } from '@angular/core';
import { DocumentInvoice } from '@billing-models/document-invoice.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSourceDocumentHeader } from '@billing/data/datasource-facbol.service';
import { Currency, Reason, Serie } from '@auth/models/default-values.model';
import { Dialog } from '@angular/cdk/dialog';
import { ExchangeRateService } from '@billing-services/tipo-cambio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from '@auth/services/default-values.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MyDate } from '@billing-utils/date';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import {
  DOCUMENT_INVENTORY_TAKING,
  MatSnackBarSuccessConfig,
} from '@billing-utils/constants';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DocumentInventoryTakingService } from '@billing-services/document-inventory-taking.service';

@Component({
  selector: 'app-register-inventory-taking',
  templateUrl: './register-inventory-taking.component.html',
  styleUrls: ['./register-inventory-taking.component.scss'],
})
export class RegisterInventoryTakingComponent {
  @Input() isNewDocument = false;
  @Input() isEditDocumentValue: DocumentInvoice | undefined = undefined;
  @Input() isCalculateDocument = false;
  formDocumentHeader!: FormGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  dataHeaderSource = DataSourceDocumentHeader.getInstance();

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
      codbuspar: ['0000000000', [Validators.required]],
      busnam: ['None', [Validators.required]],
      addres: ['None', [Validators.required]],
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
    private documentInventoryTakingService: DocumentInventoryTakingService
  ) {
    this.currencies =
      this.defaultValuesService.getLocalStorageValue('currencies');
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === 1);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === 1 && data.inout === 1);
    this.defaultSeries = this.series.find((data) => data.defaul === 'Y');
    this.defaultReason = this.reasons.find((data) => data.defaul === 'Y');
    this.buildForm(
      0,
      DOCUMENT_INVENTORY_TAKING,
      this.defaultSeries?.serie,
      this.defaultReason?.reacomdoc
    );
    if (!this.documentInventoryTakingService.isStatusInventoryTakingSave()) {
      this.formDocumentHeader.markAllAsTouched();
      if (!this.formDocumentHeader.valid) {
        this.documentInventoryTakingService.setStatusInventoryTakingRegister(
          false
        );
      } else {
        this.documentInventoryTakingService.setStatusInventoryTakingRegister(
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
        this.documentInventoryTakingService.setStatusInventoryTakingRegister(
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
    this.formDocumentHeader.get('serie')?.disable();
    this.formDocumentHeader.get('codmot')?.disable();
    this.documentInventoryTakingService.setStatusInventoryTakingRegister(false);
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
    this.documentInventoryTakingService.setStatusInventoryTakingRegister(false);
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
            this.documentInventoryTakingService.setStatusInventoryTakingRegister(
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
            this.documentInventoryTakingService.setStatusInventoryTakingRegister(
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
          this.documentInventoryTakingService.setStatusInventoryTakingRegister(
            false
          );
        },
      });
  }
}
