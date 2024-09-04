import { Component } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BusinessPartnerService } from '@billing-services/interlocutor-comcercial.service';
import { BusinessPartner } from '@billing-models/business-partner.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { DialogCrudClienteComponent } from '../dialog-crud-cliente/dialog-crud-cliente.component';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import {
  NoDataFoundMessageDialog,
  MatSnackBarSuccessConfig,
} from '@billing-utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { PageEvent } from '@angular/material/paginator';
import { TypeBusinessPartnerDefaultValues } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-dialog-all-cliente',
  templateUrl: './dialog-all-cliente.component.html',
  styleUrls: ['./dialog-all-cliente.component.scss'],
})
export class DialogAllClienteComponent {
  dataSource = new DataSourceBusinessPartner();
  displayedColumns: string[] = ['codbuspar', 'busnam', 'nroidedoc', 'operac'];
  formSearchCliente!: FormGroup;
  countRecords = 0;
  // Page
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  // LocalStorage
  typeBusinessPartners: TypeBusinessPartnerDefaultValues[] = [];
  // Formulario - Search
  private buildForm(typbuspar: number = 1) {
    this.formSearchCliente = this.formBuilder.group(
      {
        typbuspar: [typbuspar, [Validators.required]],
        codbuspar: ['', []],
        busnam: ['', []],
        status: [false, []],
      }
      // {
      //   validators: [MyValidators.NotNullValidatorTwo('codbuspar', 'busnam')],
      // }
    );
  }

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private businessPartnerService: BusinessPartnerService,
    private formBuilder: FormBuilder,
    private defaultValuesService: DefaultValuesService,
    private matSnackBar: MatSnackBar
  ) {
    this.typeBusinessPartners = this.defaultValuesService.getLocalStorageValue(
      'typeBusinessPartners'
    );
    this.buildForm(
      this.typeBusinessPartners.find((data) => data.defaul == 'Y')?.typbuspar ??
        1
    );
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formSearchCliente.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  searchBusinessPartner() {
    if (this.formSearchCliente.invalid) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      this.formSearchCliente.markAllAsTouched();
      return;
    }
    this.businessPartnerService
      .getByPage(
        this.typbuspar?.value,
        this.codbuspar?.value,
        this.busnam?.value,
        this.status?.value,
        this.pageSize,
        this.pageIndex
      )
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          this.dataSource.getInit(data.page.content);
          this.totalElements = data.page.totalElements;
        },
      });
  }

  closeDialog(row: BusinessPartner | null) {
    this.dialogRef.close(row);
  }

  crudBusinessPartner(row: BusinessPartner | null) {
    this.dialog.open(DialogCrudClienteComponent, {
      data: {
        codbuspar: row?.codbuspar,
        busnam: row?.busnam,
        isNewBussinessPartner: row ? false : true,
      },
    });
  }

  cleanBusinessPartner(row: BusinessPartner) {
    this.dataSource.getClean(row.codbuspar);
  }

  deleteBusinessPartner(row: BusinessPartner) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 0,
        message: `Esta seguro en eliminar el Interlocutor Comercial ${row.codbuspar}, esta acción no es reversible!`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        if (data) {
          this.businessPartnerService.delDelete(row.codbuspar).subscribe({
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
                this.dataSource.getClean(row.codbuspar);
              }
            },
          });
        }
      },
    });
  }

  undeleteBusinessPartner(row: BusinessPartner) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 1,
        message: `Esta seguro en activar el Interlocutor Comercial ${row.codbuspar}`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        if (data) {
          this.businessPartnerService.putUndelete(row.codbuspar).subscribe({
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
                this.dataSource.getClean(row.codbuspar);
              }
            },
          });
        }
      },
    });
  }

  byPageEvent(e: PageEvent) {
    console.log(e.pageIndex);
    this.businessPartnerService
      .getByPage(
        this.typbuspar?.value,
        this.codbuspar?.value,
        this.busnam?.value,
        this.status?.value,
        this.pageSize,
        e.pageIndex
      )
      .subscribe((data) => {
        this.dataSource.getInit(data.page.content);
      });
  }

  get typbuspar() {
    return this.formSearchCliente.get('typbuspar');
  }
  get codbuspar(): AbstractControl | null {
    return this.formSearchCliente.get('codbuspar');
  }
  get busnam(): AbstractControl | null {
    return this.formSearchCliente.get('busnam');
  }
  get status(): AbstractControl | null {
    return this.formSearchCliente.get('status');
  }

}

export class DataSourceBusinessPartner extends DataSource<BusinessPartner> {
  data = new BehaviorSubject<BusinessPartner[]>([]);
  originalData = new BehaviorSubject<BusinessPartner[]>([]);

  connect(): Observable<BusinessPartner[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: BusinessPartner[]) {
    this.data.next(data);
    this.originalData.next(data);
  }

  getClean(codbuspar: string) {
    const data = this.data.getValue();
    const newData = data.filter((data) => data.codbuspar !== codbuspar);
    this.data.next(newData);
    this.originalData.next(newData);
  }

  getFind(query: string) {
    const data = this.originalData.getValue();
    const newData = data.filter((data) => {
      const word = `${data.codbuspar}${data.busnam}`;
      return word.toLowerCase().includes(query.toLowerCase());
    });
    this.data.next(newData);
  }

  getCount() {
    const data = this.data.getValue();
    return data.reduce((count, data) => (count = count + 1), 0);
  }

}
