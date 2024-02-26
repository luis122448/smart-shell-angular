import { Component, OnInit, Inject } from '@angular/core';
import { Currency } from 'src/app/auth/models/default-values.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPriceService } from '@billing-services/list-price.service';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DatePipe } from '@angular/common';
import { BasicListPrice, ListPrice } from '@billing-models/list-price.model';

interface DialogData {
  listPrice: ListPrice,
  isNewListPrice: boolean
}

@Component({
  selector: 'app-basic-info-list-price',
  templateUrl: './basic-info-list-price.component.html',
  styleUrls: ['./basic-info-list-price.component.scss'],
})
export class BasicInfoListPriceComponent implements OnInit {

  formCrudListPrice!: FormGroup;
  currencies: Currency[] = [];

  private buildForm() {
    this.formCrudListPrice = this.formBuilder.group({
      codlistprice: ['', [Validators.required]],
      abrevi: ['', [Validators.required]],
      descri: ['', [Validators.required]],
      codext: ['', [Validators.required]],
      codcur: ['', [Validators.required]],
      inctax: [false, [Validators.required]],
      observ: ['', []],
      commen: ['', []],
      status: ['', []],
      createby: [{ value: '', disabled: true }, []],
      updateby: [{ value: '', disabled: true }, []],
      createat: [{ value: '', disabled: true }, []],
      updateat: [{ value: '', disabled: true }, []],
    });
  }

  constructor(
    private listPriceService: ListPriceService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    @Inject(DIALOG_DATA) data: DialogData | null,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ) {
    this.currencies = this.defaultValuesService.getCookieValue('currencies');
    this.buildForm();
    if (!data?.isNewListPrice && data?.listPrice) {
      this.formCrudListPrice.patchValue({
        codlistprice: data.listPrice.codlistprice,
        abrevi: data.listPrice.abrevi,
        descri: data.listPrice.descri,
        codext: data.listPrice.codext,
        codcur: data.listPrice.codcur,
        inctax: data.listPrice.inctax === 'Y' ? true : false,
        observ: data.listPrice.observ,
        commen: data.listPrice.commen,
        status: data.listPrice.status,
        createby: data.listPrice.createby,
        updateby: data.listPrice.updateby,
        createat: data.listPrice.createat,
        updateat: data.listPrice.updateat,
      });
      this.codlistprice?.disable();
    }
  }

  ngOnInit(): void {
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudListPrice.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date)
  }

  saveListPrice() {
    if (this.formCrudListPrice.valid) {
      this.formCrudListPrice.value.inctax =
        this.formCrudListPrice.value.inctax === true ? 'Y' : 'N';
      this.listPriceService.postSave(this.formCrudListPrice.value).subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          if (data.status >= 0) {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.dialogRef.close();
          }
        },
      });
    } else {
      this.formCrudListPrice.markAllAsTouched();
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' }
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get codlistprice() {
    return this.formCrudListPrice.get('codlistprice');
  }
  get abrevi() {
    return this.formCrudListPrice.get('abrevi');
  }
  get descri() {
    return this.formCrudListPrice.get('descri');
  }
  get codext() {
    return this.formCrudListPrice.get('codext');
  }
  get codcur() {
    return this.formCrudListPrice.get('codcur');
  }
  get inctax() {
    return this.formCrudListPrice.get('inctax');
  }
  get observ() {
    return this.formCrudListPrice.get('observ');
  }
  get commen() {
    return this.formCrudListPrice.get('commen');
  }
  get status() {
    return this.formCrudListPrice.get('status');
  }
  get createby() {
    return this.formCrudListPrice.get('createby');
  }
  get updateby() {
    return this.formCrudListPrice.get('updateby');
  }
  get createat() {
    return this.formCrudListPrice.get('createat');
  }
  get updateat() {
    return this.formCrudListPrice.get('updateat');
  }
}
