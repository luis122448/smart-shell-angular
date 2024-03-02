import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IntcomCondicionPagoView,
  InterlocutorComercialBasic,
} from '@billing-models/interlocutor-comercial.model';
import { BusinessPartnerService } from '@billing-services/interlocutor-comcercial.service';
import { TypePaymentConditionService } from '@billing-services/type-payment-condition.service';
import { DataSource } from '@angular/cdk/collections';
import { TypePaymentCondition } from '@billing-models/type-payment-condition.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import {
  MatSnackBarSuccessConfig,
  NoDataFoundMessageDialog,
} from '@billing-utils/constants';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { IntcomCondicionPago } from '@billing-models/interlocutor-comercial.model';
import { MyDate } from '@billing-utils/date';

@Component({
  selector: 'app-condicion-pago-cliente',
  templateUrl: './condicion-pago-cliente.component.html',
  styleUrls: ['./condicion-pago-cliente.component.scss'],
})
export class CondicionPagoClienteComponent implements OnInit {
  formInfoIntcom!: FormGroup;
  formTypePaymentCondition!: FormGroup;
  dataSourceTypePaymentConditionView = new DataSourceTypePaymentConditionView();
  displayedColumns: string[] = [
    'destyppaycon',
    'limcre',
    'updateby',
    'updateat',
    'operac',
  ];
  optionTypePaymentCondition: TypePaymentCondition[] = [];

  buildForm() {
    this.formInfoIntcom = this.formBuilder.group({
      codbuspar: ['', [Validators.required]],
      busnam: ['', [Validators.required]],
    });
    this.formTypePaymentCondition = this.formBuilder.group({
      codbuspar: ['', [Validators.required]],
      typpaycon: ['', [Validators.required]],
      limcre: ['', [Validators.required]],
    });
  }

  constructor(
    private datePipe: DatePipe,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder,
    private businessPartnerService: BusinessPartnerService,
    private tipoCondicionPagoService: TypePaymentConditionService,
    private globalStatusService: GlobalStatusService,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) private data: InterlocutorComercialBasic
  ) {
    this.buildForm();
    this.codbuspar?.setValue(data.codbuspar);
    this.codbuspar?.disable();
    this.busnam?.setValue(data.busnam);
    this.busnam?.disable();
    this.formTypePaymentCondition.get('codbuspar')?.setValue(data.codbuspar);
  }
  ngOnInit(): void {
    if (!this.data.isNewBussinessPartner) {
      this.searchTypePaymentCondition();
    }
    this.globalStatusService.setLoading(true);
    this.tipoCondicionPagoService.getByAll().subscribe({
      next: (data) => {
        this.optionTypePaymentCondition = data.list;
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        }
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
      },
      complete: () => {
        this.globalStatusService.setLoading(false);
      },
    });
  }

  searchTypePaymentCondition() {
    this.globalStatusService.setLoading(true);
    this.businessPartnerService
      .getByCodintcomCondicionPago(this.codbuspar?.value)
      .subscribe({
        next: (data) => {
          this.dataSourceTypePaymentConditionView.getInit(data.list);
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.globalStatusService.setLoading(false);
        },
        complete: () => {
          this.globalStatusService.setLoading(false);
        },
      });
  }

  addTypePaymentCondition() {
    this.globalStatusService.setLoading(true);
    const intcomCondicionPago: IntcomCondicionPago = {
      codbuspar: this.data.codbuspar,
      typpaycon: this.typpaycon?.value,
      limcre: this.limcre?.value,
    };
    this.businessPartnerService
      .postSaveCondicionPago(intcomCondicionPago)
      .subscribe({
        next: (data) => {
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
            this.searchTypePaymentCondition();
          }
          this.globalStatusService.setLoading(false);
        },
      });
  }

  deleteTypePaymentCondition(row: TypePaymentCondition) {
    this.globalStatusService.setLoading(true);
    this.businessPartnerService
      .delDeleteCondicionPago(this.data.codbuspar, row.typpaycon)
      .subscribe({
        next: (data) => {
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
            this.searchTypePaymentCondition();
          }
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.globalStatusService.setLoading(false);
        },
        complete: () => {
          this.globalStatusService.setLoading(false);
        },
      });
  }

  get codbuspar() {
    return this.formInfoIntcom.get('codbuspar');
  }
  get busnam() {
    return this.formInfoIntcom.get('busnam');
  }
  get typpaycon() {
    return this.formTypePaymentCondition.get('typpaycon');
  }
  get limcre() {
    return this.formTypePaymentCondition.get('limcre');
  }
  formatDate(date: number[]): String {
    const aux: Date = MyDate.convertToCustomDate(date);
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())) {
      return this.datePipe.transform(aux, 'HH:mm - dd/MM/yy') || '';
    }
    return '';
  }
}

export class DataSourceTypePaymentConditionView extends DataSource<IntcomCondicionPagoView> {
  data = new BehaviorSubject<IntcomCondicionPagoView[]>([]);

  connect(): Observable<IntcomCondicionPagoView[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: IntcomCondicionPagoView[]) {
    this.data.next(data);
  }

  getPush(data: IntcomCondicionPagoView) {
    const newData = [...this.data.value, data];
    this.data.next(newData);
  }

  getClean(typpaycon: number) {
    const data = this.data.getValue();
    const newData = data.filter((data) => data.typpaycon !== typpaycon);
    this.data.next(newData);
  }
}
