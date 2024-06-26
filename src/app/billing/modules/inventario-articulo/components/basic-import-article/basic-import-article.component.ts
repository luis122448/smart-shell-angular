import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from '@billing-services/article.service';

import { downloadFile } from '@billing-utils/function';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { Inventory } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

interface DialogData {
  typinv: number;
}

@Component({
  selector: 'app-basic-import-article',
  templateUrl: './basic-import-article.component.html',
  styleUrls: ['./basic-import-article.component.scss'],
})
export class BasicImportArticleComponent implements OnInit {
  formCrudInventoryArticle!: FormGroup;
  validListPrice = false;
  inventories: Inventory[] = [];
  defaultInventory: Inventory | undefined;

  private buildForm(typinv: number = 1) {
    this.formCrudInventoryArticle = this.formBuilder.group({
      typinv: [{ value: typinv, disabled: false }, [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private articleService: ArticleService,
    @Inject(DIALOG_DATA) data: DialogData,
    private defaultValuesService: DefaultValuesService
  ) {
    this.inventories =
      this.defaultValuesService.getLocalStorageValue('inventories');
    this.defaultInventory = this.inventories.find(
      (data) => data.defaul === 'Y'
    );
    this.buildForm(this.defaultInventory?.typinv);
  }
  ngOnInit(): void {}

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudInventoryArticle.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  clearArchive() {
    const fileInput = document.getElementById('file_input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.file?.setValue('');
  }

  selectArchive(event: any) {
    if (event?.target) {
      const data: File = event.target.files[0];
      this.file?.setValue(data);
    }
  }

  importArticle() {
    if (this.formCrudInventoryArticle.invalid) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'Y' },
      });
      this.formCrudInventoryArticle.markAllAsTouched();
      return;
    }
    this.articleService
      .postByImport(this.typinv?.value, this.file?.value)
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          const fileName = `${data.name}.${data.extension}`;
          downloadFile(data, fileName);
          this.clearArchive();
        },
      });
  }

  exportArticle() {
    if (this.typinv?.valid == false) {
      this.typinv.markAsTouched();
      return;
    }
    this.articleService.getByExport(this.typinv?.value).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          const fileName = `${data.name}.${data.extension}`;
          downloadFile(data, fileName);
        }
      },
    });
  }

  exportBlankArticle() {
    this.articleService.getByExport(0).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        } else {
          const fileName = `${data.name}.${data.extension}`;
          downloadFile(data, fileName);
        }
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get typinv() {
    return this.formCrudInventoryArticle.get('typinv');
  }
  get file() {
    return this.formCrudInventoryArticle.get('file');
  }
}
