import { DataSource } from '@angular/cdk/collections';
import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BasicExchangeRate,
  ExchangeRate,
} from '@billing-models/exchange-rate.model';

import { ExchangeRateService } from '@billing-services/tipo-cambio.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currency } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-basic-all-exchange-rate',
  templateUrl: './basic-all-exchange-rate.component.html',
  styleUrls: ['./basic-all-exchange-rate.component.scss'],
})
export class BasicAllExchangeRateComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<boolean>();
  @Output() basicExchangeRate = new EventEmitter<BasicExchangeRate>();
  totalElements = 0;

  formSearchExchangeRate!: FormGroup;
  dataSourceExchangeRate = new DataSourceExchangeRateExchangeRate();
  displayedColumns: string[] = [
    'registdate',
    'origen',
    'destin',
    'eventa',
    'ecompra',
    'operac',
  ];
  currencies: Currency[] = [];

  private buildForm() {
    // const today = new Date().toJSON().split('T')[0]
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toJSON()
      .split('T')[0];
    this.formSearchExchangeRate = this.formBuilder.group({
      startat: [yesterday, [Validators.required]],
      finalat: [yesterday, [Validators.required]],
      origen: ['', []],
      destin: ['', []],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private tipoCambioService: ExchangeRateService,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.tipoCambioService
      .getByLike(this.startat?.value, this.finalat?.value, '', '')
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          this.dataSourceExchangeRate.getInit(data.list);
          this.totalElements = data.list.length;
        }
      });
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringShort(date);
  }

  searchExchangeRate() {
    this.tipoCambioService
      .getByLike(
        this.startat?.value,
        this.finalat?.value,
        this.origen?.value,
        this.destin?.value
      )
      .subscribe({
        next: (data) => {
          this.dataSourceExchangeRate.getInit(data.list);
          this.totalElements = data.list.length;
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
        },
      });
  }

  deleteExchangeRate(row: ExchangeRate) {
    this.tipoCambioService
      .delDelete(
        MyDate.convertToCustomDateShort(row.registdate),
        row.origen,
        row.destin
      )
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: { status: data.status, message: data.message },
            });
          } else {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.dataSourceExchangeRate.getClean(row);
            this.totalElements--;
          }
        },
      });
  }

  crudExchangeRate(data: ExchangeRate | null) {
    this.onSave.emit(true);
    this.basicExchangeRate.emit({
      registdate: data?.registdate || [],
      origen: data?.origen || '',
      destin: data?.destin || '',
    });
  }

  closeDialog() {
    this.onClose.emit(true);
  }

  get startat() {
    return this.formSearchExchangeRate.get('startat');
  }
  get finalat() {
    return this.formSearchExchangeRate.get('finalat');
  }
  get origen() {
    return this.formSearchExchangeRate.get('origen');
  }
  get destin() {
    return this.formSearchExchangeRate.get('destin');
  }
}

export class DataSourceExchangeRateExchangeRate extends DataSource<ExchangeRate> {
  data = new BehaviorSubject<ExchangeRate[]>([]);

  connect(): Observable<ExchangeRate[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: ExchangeRate[]) {
    this.data.next(data);
  }

  getClean(clean: ExchangeRate) {
    const aux = this.data.getValue();
    const newData = aux.filter(
      (data) =>
        !(
          data.registdate === clean.registdate &&
          data.origen === clean.origen &&
          data.destin === clean.destin
        )
    );
    this.data.next(newData);
  }
}
