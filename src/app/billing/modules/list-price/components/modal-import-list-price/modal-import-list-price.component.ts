import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPriceArticle } from '@billing-models/list-price-article.model';
import { ListPrice } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { MyDate } from '@billing-utils/date';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';


interface DialogData {
  row: ListPriceArticle | null;
  codlistprice: number;
  isNewListPriceArticle: boolean;
}

@Component({
  selector: 'app-modal-import-list-price',
  templateUrl: './modal-import-list-price.component.html',
  styleUrls: ['./modal-import-list-price.component.scss'],
})
export class ModalImportListPriceComponent {
  formArticleListPrice!: FormGroup;
  listprices: ListPrice[] = [];
  isNewListPriceArticle: boolean = false;

  private buildForm(codlistprice: number | null = null) {
    this.formArticleListPrice = this.formBuilder.group({
      codlistprice: [
        { value: codlistprice, disabled: codlistprice ? true : false },
        [Validators.required],
      ],
      codart: ['', [Validators.required]],
      desart: ['', [Validators.required]],
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
    private listPriceArticleService: ListPriceArticleService,
    @Inject(DIALOG_DATA) data: DialogData
  ) {
    this.listprices =
      this.defaultValuesService.getLocalStorageValue('listprices');
    this.isNewListPriceArticle = data.isNewListPriceArticle;
    if (data.row && !data.isNewListPriceArticle) {
      this.buildForm(data.row.codlistprice);
      this.formArticleListPrice.patchValue({
        ...data.row,
        price: data.row.price.toFixed(2),
        desmax: data.row.desmax.toFixed(2),
        desc01: data.row.desc01.toFixed(2),
        desc02: data.row.desc02.toFixed(2),
        desc03: data.row.desc03.toFixed(2),
        desc04: data.row.desc04.toFixed(2),
        modprice: data.row.modprice === 'Y' ? true : false,
        moddesc: data.row.moddesc === 'Y' ? true : false,
      });
      this.formArticleListPrice.get('codart')?.disable();
      this.formArticleListPrice.get('desart')?.disable();
    } else {
      this.buildForm(data.codlistprice);
    }
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
        complete: () => {
          this.closeDialog()
        },
      });
    } else {
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
          complete: () => {
            this.closeDialog()
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
