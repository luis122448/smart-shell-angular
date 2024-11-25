import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Currency } from '@auth/models/default-values.model';
import { DefaultValuesService } from '@auth/services/default-values.service';
import { ExchangeRateService } from '@billing-services/tipo-cambio.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';

@Component({
  selector: 'app-basic-info-exchange-rate',
  templateUrl: './basic-info-exchange-rate.component.html',
  styleUrls: ['./basic-info-exchange-rate.component.scss'],
})
export class BasicInfoExchangeRateComponent {
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<boolean>();
  formCrudExchangeRate!: FormGroup;
  currencies: Currency[] = [];

  private buildForm(codcur: string | undefined) {
    const today = new Date().toJSON().split('T')[0];
    // const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    //   .toJSON()
    //   .split('T')[0];
    this.formCrudExchangeRate = this.formBuilder.group({
      registdate: [today, [Validators.required]],
      origen: [codcur, [Validators.required]],
      destin: ['', [Validators.required]],
      fventa: [
        (0.0).toFixed(2),
        [
          Validators.required,
          Validators.min(2),
          Validators.max(5),
          Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/),
        ],
      ],
      fcompra: [
        (0.0).toFixed(2),
        [
          Validators.required,
          Validators.min(2),
          Validators.max(5),
          Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/),
        ],
      ],
      cventa: [(0.0).toFixed(2), []],
      ccompra: [(0.0).toFixed(2), []],
      eventa: [
        (0.0).toFixed(2),
        [
          Validators.required,
          Validators.min(2),
          Validators.max(5),
          Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/),
        ],
      ],
      ecompra: [
        (0.0).toFixed(2),
        [
          Validators.required,
          Validators.min(2),
          Validators.max(5),
          Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/),
        ],
      ],
      status: ['', []],
      createby: [{ value: '', disabled: true }, []],
      updateby: [{ value: '', disabled: true }, []],
      createat: [{ value: '', disabled: true }, []],
      updateat: [{ value: '', disabled: true }, []],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private tipoCambioService: ExchangeRateService,
    private defaulrValuesService: DefaultValuesService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ) {
    this.currencies = this.defaulrValuesService.getLocalStorageValue('currencies');
    this.buildForm(this.currencies.find((currency) => currency.defaul === 'Y')?.codcur);
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudExchangeRate.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date);
  }

  importSunat() {
    this.tipoCambioService
      .getExchangeRateSunat(new Date(Date.parse(this.crudFecha?.value)))
      .subscribe({
        next: (data) => {
          this.formCrudExchangeRate.patchValue({
            ...data,
            registdate: data.registdate.toISOString().split('T')[0],
            fventa: data.eventa.toFixed(2),
            fcompra: data.ecompra.toFixed(2),
            cventa: data.eventa.toFixed(2),
            ccompra: data.ecompra.toFixed(2),
            eventa: data.eventa.toFixed(2),
            ecompra: data.ecompra.toFixed(2),
          });
          this.matSnackBar.openFromComponent(
            MatsnackbarSuccessComponent,
            MatSnackBarSuccessConfig
          );
        }
      });
  }

  saveExchangeRate() {
    if (this.formCrudExchangeRate.invalid) {
      this.formCrudExchangeRate.markAllAsTouched();
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      return;
    }
    if (this.crudCcompra) {
      this.crudCcompra.setValue(this.crudEcompra?.value);
    }
    if (this.crudFcompra) {
      this.crudFcompra.setValue(this.crudEcompra?.value);
    }
    if (this.crudCventa) {
      this.crudCventa.setValue(this.crudEventa?.value);
    }
    if (this.crudFventa) {
      this.crudFventa.setValue(this.crudEventa?.value);
    }
    this.tipoCambioService.postSave(this.formCrudExchangeRate.value).subscribe({
      next: (data) => {
        {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          } else {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.formCrudExchangeRate.reset();
            this.onSave.emit(false);
          }
        }
      },
    });
  }

  closeDialog() {
    this.onClose.emit(true);
  }

  get crudFecha() {
    return this.formCrudExchangeRate.get('registdate');
  }
  get crudMonori() {
    return this.formCrudExchangeRate.get('origen');
  }
  get crudMondes() {
    return this.formCrudExchangeRate.get('destin');
  }
  get crudFventa() {
    return this.formCrudExchangeRate.get('fventa');
  }
  get crudFcompra() {
    return this.formCrudExchangeRate.get('fcompra');
  }
  get crudCventa() {
    return this.formCrudExchangeRate.get('cventa');
  }
  get crudCcompra() {
    return this.formCrudExchangeRate.get('ccompra');
  }
  get crudEventa() {
    return this.formCrudExchangeRate.get('eventa');
  }
  get crudEcompra() {
    return this.formCrudExchangeRate.get('ecompra');
  }
  get createby() {
    return this.formCrudExchangeRate.get('createby');
  }
  get updateby() {
    return this.formCrudExchangeRate.get('updateby');
  }
  get createat() {
    return this.formCrudExchangeRate.get('createat');
  }
  get updateat() {
    return this.formCrudExchangeRate.get('updateat');
  }
}
