import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleBasic } from '@billing-models/article.model';
import { ListPriceArticle } from '@billing-models/list-price-article.model';
import { ListPrice } from '@billing-models/list-price.model';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-lista-precios-articulo',
  templateUrl: './lista-precios-articulo.component.html',
  styleUrls: ['./lista-precios-articulo.component.scss'],
})
export class ListaPreciosArticleComponent {
  formArticleListPrice!: FormGroup;
  listprices: ListPrice[] = [];
  isNewListPriceArticle: boolean = false;

  private buildForm(
    codart: string | null = null,
    desart: string | null = null
  ) {
    this.formArticleListPrice = this.formBuilder.group({
      codlistprice: ['', [Validators.required]],
      codart: [
        { value: codart, disabled: codart ? true : false },
        [Validators.required],
      ],
      desart: [desart, [Validators.required]],
      price: [0.0, [Validators.required]],
      modprice: [false, [Validators.required]],
      moddesc: [false, [Validators.required]],
      desmax: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      desc01: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      desc02: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      desc03: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      desc04: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      status: ['', []],
      createby: [{ value: '', disabled: true }, []],
      updateby: [{ value: '', disabled: true }, []],
      createat: [{ value: '', disabled: true }, []],
      updateat: [{ value: '', disabled: true }, []],
    });
  }

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService,
    private listPriceArticleService: ListPriceArticleService,
    @Inject(DIALOG_DATA) data: ArticleBasic
  ) {
    this.listprices =
      this.defaultValuesService.getLocalStorageValue('listprices');
    this.buildForm(data.codart, data.descri);
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formArticleListPrice.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date);
  }

  saveArticleListPrice() {
    if (this.formArticleListPrice.invalid) {
      this.formArticleListPrice.markAllAsTouched();
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'Y' },
      });
      return;
    }
    if (this.isNewListPriceArticle) {
      this.globalStatusService.setLoading(true);
      const articleListPrice: ListPriceArticle = {
        ...this.formArticleListPrice.getRawValue(),
        modprice: this.formArticleListPrice.value.modprice ? 'Y' : 'N',
        moddesc: this.formArticleListPrice.value.moddesc ? 'Y' : 'N',
      };
      this.listPriceArticleService.postSave(articleListPrice).subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          this.dialogRef.close(data);
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
          this.closeDialog();
        },
      });
    } else {
      this.globalStatusService.setLoading(true);
      const articleListPrice: ListPriceArticle = {
        ...this.formArticleListPrice.getRawValue(),
        modprice: this.formArticleListPrice.value.modprice ? 'Y' : 'N',
        moddesc: this.formArticleListPrice.value.moddesc ? 'Y' : 'N',
      };
      this.listPriceArticleService
        .putUpdate(
          articleListPrice,
          articleListPrice.codlistprice,
          articleListPrice.codart
        )
        .subscribe({
          next: (data) => {
            if (data.status <= 0) {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: data,
              });
            }
            this.dialogRef.close(data);
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
            this.closeDialog();
          },
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get createby() {
    return this.formArticleListPrice.get('createby');
  }

  get updateby() {
    return this.formArticleListPrice.get('updateby');
  }

  get createat() {
    return this.formArticleListPrice.get('createat');
  }

  get updateat() {
    return this.formArticleListPrice.get('updateat');
  }
}
