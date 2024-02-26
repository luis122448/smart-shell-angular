import { DataSource } from '@angular/cdk/collections';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ListPrice } from '@billing-models/list-price.model';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ListPriceService } from '@billing-services/list-price.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteQuestionComponent } from '@shared/components/dialog-delete-question/dialog-delete-question.component';
import { DialogCrudListPriceComponent } from '../dialog-crud-list-price/dialog-crud-list-price.component';

@Component({
  selector: 'app-dialog-all-list-price',
  templateUrl: './dialog-all-list-price.component.html',
  styleUrls: ['./dialog-all-list-price.component.scss'],
})
export class DialogAllListPriceComponent {
  dataSourceListPrice = new DataSourceListPrice();
  displayedColumns: string[] = ['codlistprice', 'descri', 'codext', 'operac'];
  totalElements = 0;

  constructor(
    private listPriceService: ListPriceService,
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar
  ) {}

  searchListPrice() {
    this.globalStatusService.setLoading(true);
    this.listPriceService.getAll().subscribe({
      next: (data) => {
        this.dataSourceListPrice.getInit(data.list);
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
        }
        this.totalElements = this.dataSourceListPrice.getCount();
        this.globalStatusService.setLoading(false);
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
      },
    });
  }

  crudListPrice(row: ListPrice | null) {
    this.dialog.open(DialogCrudListPriceComponent, {
      data: {
        listPrice: row,
        isNewListPrice: row ? false : true,
      }
    });
  }

  deleteListPrice(row: ListPrice) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 0,
        message: `Are you sure to delete price list ${row.codlistprice} - ${row.descri} ? This action is not reversible`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        if (data) {
          this.listPriceService.delDelete(row.codlistprice).subscribe({
            next: (data) => {
              if (data.status <= 0) {
                this.dialog.open(DialogErrorAlertComponent, {
                  width: '400px',
                  data: data
                });
              } else {
                this.matSnackBar.openFromComponent(
                  MatsnackbarSuccessComponent,
                  MatSnackBarSuccessConfig
                );
                this.dataSourceListPrice.getClean(row.codlistprice);
                this.totalElements = this.dataSourceListPrice.getCount();
              }
            },
            error: (err) => {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: err.error,
              });
              this.globalStatusService.setLoading(false);
            },
          });
        }
      },
    });
  }

  closeDialog(row: ListPrice | null) {
    this.dialogRef.close();
  }
}

export class DataSourceListPrice extends DataSource<ListPrice> {
  data = new BehaviorSubject<ListPrice[]>([]);

  connect(): Observable<ListPrice[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: ListPrice[]) {
    this.data.next(data);
  }

  getClean(codlistprice: number) {
    const aux = this.data.getValue();
    const cleanData = aux.filter((data) => data.codlistprice !== codlistprice);
    this.data.next(cleanData);
  }

  getCount() {
    const aux = this.data.getValue();
    return aux.reduce((count, data) => (count = count + 1), 0);
  }
}
