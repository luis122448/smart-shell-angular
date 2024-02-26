import { Component, OnInit } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MyValidators } from '@billing-utils/validator';
import { ArticleService } from '@billing-services/article.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from '@billing-models/article.model';
import { DialogCrudArticleComponent } from '../dialog-crud-articulo/dialog-crud-articulo.component';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import {
  MatSnackBarSuccessConfig,
  NoDataFoundMessageDialog,
} from '@billing-utils/constants';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeInventoryService } from '@billing-services/type-inventory.service';
import { TypeInventory } from '@billing-models/type-inventory.model';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Inventory } from 'src/app/auth/models/default-values.model';
import { DialogImportArticleComponent } from '../dialog-import-article/dialog-import-article.component';

@Component({
  selector: 'app-dialog-all-inventario-articulo',
  templateUrl: './dialog-all-inventario-articulo.component.html',
  styleUrls: ['./dialog-all-inventario-articulo.component.scss'],
})
export class DialogAllInventarioArticleComponent implements OnInit {
  dataSource = new DataSourceArticle();
  displayedColumns: string[] = ['codart', 'descri', 'codext', 'operac'];
  optionTipinv: TypeInventory[] = [];
  selectTipinv: TypeInventory | null = null;
  formSearchInventarioArticle!: FormGroup;
  countRecords = 0;
  // Page
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  // Default Values
  inventories: Inventory[] = [];
  defaultInventory: Inventory | undefined;

  private buildForm(typinv: number = 1) {
    this.formSearchInventarioArticle = this.formBuilder.group(
      {
        typinv: [typinv, [Validators.required]],
        codart: ['', []],
        descri: ['', []],
        status: ['', []],
      },
      {
        validators: [MyValidators.NotNullValidatorTwo('codart', 'desart')],
      }
    );
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formSearchInventarioArticle.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private articuloService: ArticleService,
    private formBuilder: FormBuilder,
    private globalStatusService: GlobalStatusService,
    private defaultValuesService: DefaultValuesService,
    private matSnackBar: MatSnackBar
  ) {
    this.inventories = this.defaultValuesService.getCookieValue('inventories');
    this.defaultInventory = this.inventories.find(
      (data) => data.defaul === 'Y'
    );
    this.buildForm(this.defaultInventory?.typinv);
  }
  ngOnInit(): void {}

  searchArticle() {
    if (this.formSearchInventarioArticle.valid) {
      this.globalStatusService.setLoading(true);
      this.articuloService
        .getPage(
          this.typinv?.value,
          this.codart?.value,
          this.descri?.value,
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
      this.formSearchInventarioArticle.markAllAsTouched();
    }
  }

  crudArticle(row: Article | null) {
    this.dialog.open(DialogCrudArticleComponent, {
      data: {
        typinv: row?.typinv,
        codart: row?.codart,
        descri: row?.descri,
        articulo: row,
        newArticle: row ? false : true,
      },
    });
  }

  exportImportArticle() {
    this.dialog.open(DialogImportArticleComponent, {
      data: { typinv: this.typinv?.value },
    });
  }

  cleanArticle(row: Article) {
    this.dataSource.getClean(row.codart);
  }

  deleteArticle(row: Article) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 0,
        message: `Esta seguro de eliminar el Article ${row.codart}, esta acción no es reversible`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        if (data) {
          this.globalStatusService.setLoading(true);
          this.articuloService.delDelete(row.codart).subscribe({
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
                this.dataSource.getClean(row.codart);
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
      },
    });
  }

  undeleteArticle(row: Article) {
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent, {
      width: '400px',
      data: {
        status: 1,
        message: `Esta seguro de re-activar el Article ${row.codart} ?`,
      },
    });
    dialogRef.closed.subscribe({
      next: (data) => {
        if (data) {
          this.globalStatusService.setLoading(true);
          this.articuloService.putUndelete(row.codart).subscribe({
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
                this.dataSource.getClean(row.codart);
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
      },
    });
  }

  byPageEvent(e: PageEvent) {
    this.globalStatusService.setLoading(true);
    console.log(e.pageIndex);
    this.articuloService
      .getPage(
        this.typinv?.value,
        this.codart?.value,
        this.descri?.value,
        this.pageSize,
        e.pageIndex
      )
      .subscribe((data) => {
        this.dataSource.getInit(data.page.content);
        this.globalStatusService.setLoading(false);
      });
  }

  closeDialog(row: Article | null) {
    this.dialogRef.close(row);
  }

  get typinv() {
    return this.formSearchInventarioArticle.get('typinv');
  }
  get codart(): AbstractControl | null {
    return this.formSearchInventarioArticle.get('codart');
  }
  get descri(): AbstractControl | null {
    return this.formSearchInventarioArticle.get('descri');
  }
}

export class DataSourceArticle extends DataSource<Article> {
  data = new BehaviorSubject<Article[]>([]);
  originalData = new BehaviorSubject<Article[]>([]);

  connect(): Observable<Article[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: Article[]) {
    this.data.next(data);
    this.originalData.next(data);
  }

  getClean(codart: string) {
    const aux = this.data.getValue();
    const cleanData = aux.filter((data) => data.codart !== codart);
    this.data.next(cleanData);
    this.originalData.next(cleanData);
  }

  getFind(query: string) {
    const aux = this.originalData.getValue();
    const findData = aux.filter((data) => {
      const word = `${data.codart}${data.descri}`;
      return word.toLowerCase().includes(query.toLowerCase());
    });
    this.data.next(findData);
  }

  getCount() {
    const aux = this.data.getValue();
    return aux.reduce((count, data) => (count = count + 1), 0);
  }
}
