import { Component } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BusinessPartnerService } from '../../../../services/interlocutor-comcercial.service';
import { InterlocutorComercial } from '../../../../models/interlocutor-comercial.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { MyValidators } from '../../../../utils/validator';
import { DialogCrudClienteComponent } from '../dialog-crud-cliente/dialog-crud-cliente.component';
import { GlobalStatusService } from '../../../../services/global-status.service';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import {
  NoDataFoundMessageDialog,
  MatSnackBarSuccessConfig,
} from '../../../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dialog-all-cliente',
  templateUrl: './dialog-all-cliente.component.html',
  styleUrls: ['./dialog-all-cliente.component.scss'],
})
export class DialogAllClienteComponent {
  dataSource = new DataSourceInterlocutorComercial();
  displayedColumns: string[] = ['codbuspar', 'busnam', 'nroidedoc', 'operac'];
  formSearchCliente!: FormGroup;
  countRecords = 0;
  // Page
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  // Formulario - Search
  private buildForm(typbuspar: number = 1) {
    this.formSearchCliente = this.formBuilder.group(
      {
        typbuspar: [typbuspar, [Validators.required]],
        codbuspar: ['', []],
        busnam: ['', []],
        status: [false, []],
      },
      {
        validators: [MyValidators.NotNullValidatorTwo('codbuspar', 'busnam')],
      }
    );
  }

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private businessPartnerService: BusinessPartnerService,
    private formBuilder: FormBuilder,
    private globalStatusService: GlobalStatusService,
    private matSnackBar: MatSnackBar
  ) {
    this.buildForm(1);
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formSearchCliente.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  searchInterlocutorComercial() {
    if (this.formSearchCliente.valid) {
      this.globalStatusService.setLoading(true);
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
                data: { status: data.status, message: data.message },
              });
            }
            this.dataSource.getInit(data.page.content);
            this.totalElements = data.page.totalElements;
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
    } else {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      this.formSearchCliente.markAllAsTouched();
    }
  }

  closeDialog(row: InterlocutorComercial | null) {
    this.dialogRef.close(row);
  }

  crudInterlocutorComercial(row: InterlocutorComercial | null) {
    this.dialog.open(DialogCrudClienteComponent, {
      data: { codbuspar: row?.codbuspar, busnam: row?.busnam, isNewBussinessPartner: row ? false : true },
    });
  }

  cleanInterlocutorComercial(row: InterlocutorComercial) {
    this.dataSource.getClean(row.codbuspar);
  }

  deleteInterlocutorComercial(row: InterlocutorComercial) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 0,
        message: `Esta seguro en eliminar el Interlocutor Comercial ${row.codbuspar}, esta acción no es reversible!`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        this.globalStatusService.setLoading(true);
        if (data) {
          this.businessPartnerService.delDelete(row.codbuspar).subscribe({
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
                this.dataSource.getClean(row.codbuspar);
              }
            },
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
      }
    });
  }

  undeleteInterlocutorComercial(row: InterlocutorComercial) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 1,
        message: `Esta seguro en activar el Interlocutor Comercial ${row.codbuspar}`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        this.globalStatusService.setLoading(true);
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

  byPageEvent(e: PageEvent) {
    this.globalStatusService.setLoading(true);
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
        this.globalStatusService.setLoading(false);
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

export class DataSourceInterlocutorComercial extends DataSource<InterlocutorComercial> {
  data = new BehaviorSubject<InterlocutorComercial[]>([]);
  originalData = new BehaviorSubject<InterlocutorComercial[]>([]);

  connect(): Observable<InterlocutorComercial[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: InterlocutorComercial[]) {
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
