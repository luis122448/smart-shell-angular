import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MyDate } from '@billing-utils/date';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { BasicListPrice, ListPrice } from '@billing-models/list-price.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ListPriceArticle } from '@billing-models/list-price-article.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { DialogDeleteQuestionComponent } from '@shared/components/dialog-delete-question/dialog-delete-question.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { ModalImportListPriceComponent } from '../modal-import-list-price/modal-import-list-price.component';
import { PageEvent } from '@angular/material/paginator';

interface DialogData {
  listPrice: ListPrice;
  isNewListPrice: boolean;
}

@Component({
  selector: 'app-basic-article-list-price',
  templateUrl: './basic-article-list-price.component.html',
  styleUrls: ['./basic-article-list-price.component.scss'],
})
export class BasicArticleListPriceComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  formCrudListPriceArticle!: FormGroup;
  listPrice: ListPrice | null = null;
  dataSourceListPriceArticle = new DataSourceListPriceArticle();
  displayedColumns = [
    'codart',
    'desart',
    'modprice',
    'moddesc',
    'implistprice',
    'impdesctotal',
    'impsaleprice',
    'operac',
  ];

  // Page
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  private buildForm(codlistprice: number = 1) {
    this.formCrudListPriceArticle = this.formBuilder.group({
      codlistprice: [
        { value: codlistprice, disabled: true },
        [Validators.required],
      ],
      codart: ['', []],
      desart: ['', []],
    });
  }

  constructor(
    private listPriceArticleService: ListPriceArticleService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    @Inject(DIALOG_DATA) data: DialogData,
    private defaultValuesService: DefaultValuesService
  ) {
    if (!data.isNewListPrice && data.listPrice) {
      this.buildForm(data.listPrice.codlistprice);
      this.listPrice = data.listPrice;
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {}

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudListPriceArticle.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  formatDate(date: number[]): String {
    const aux: Date = MyDate.convertToCustomDateShort(date);
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())) {
      return this.datePipe.transform(aux, 'dd/MM/yy') || '';
    }
    return '';
  }

  searchListPriceArticle() {
    if (this.formCrudListPriceArticle.invalid) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      this.formCrudListPriceArticle.markAllAsTouched();
      return;
    }
    this.listPriceArticleService
      .getByPage(
        this.codlistprice?.value,
        this.codart?.value,
        this.desart?.value,
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
          this.dataSourceListPriceArticle.getInit(data.page.content);
          this.totalElements = data.page.totalElements;
        },
      });
  }

  crudListPriceArticle(row: ListPriceArticle | null) {
    this.dialog.open(ModalImportListPriceComponent, {
      data: {
        row: row,
        codlistprice: this.codlistprice?.value,
        isNewListPriceArticle: row ? false : true,
      },
    });
  }

  deleteListPriceArticle(row: ListPriceArticle) {
    const dialogDelete = this.dialog.open<boolean>(
      DialogDeleteQuestionComponent,
      {
        width: '400px',
        data: {
          status: 1,
          message: `Are you sure to delete the article ${row.codart} - ${row.desart}, this action is not reversible`,
        },
      }
    );

    dialogDelete.closed.subscribe({
      next: (data) => {
        if (data) {
          this.listPriceArticleService
            .delDelete(row.codlistprice, row.codart)
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
                  this.dataSourceListPriceArticle.getClean(
                    row.codlistprice,
                    row.codart
                  );
                }
              },
            });
        }
      },
    });
  }

  byPageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.searchListPriceArticle();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get codlistprice() {
    return this.formCrudListPriceArticle.get('codlistprice');
  }
  get codart() {
    return this.formCrudListPriceArticle.get('codart');
  }
  get desart() {
    return this.formCrudListPriceArticle.get('desart');
  }
}

export class DataSourceListPriceArticle extends DataSource<ListPriceArticle> {
  data = new BehaviorSubject<ListPriceArticle[]>([]);

  connect(): Observable<ListPriceArticle[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: ListPriceArticle[]) {
    this.data.next(data);
  }

  getClean(codlistprice: number, codart: string) {
    const aux = this.data.getValue();
    const cleanData = aux.filter(
      (data) => data.codlistprice !== codlistprice && data.codart !== codart
    );
    this.data.next(cleanData);
  }

  getCount() {
    return this.data.getValue().length;
  }
}
