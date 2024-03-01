import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleBasic } from '@billing-models/article.model';
import { ArticleService } from '@billing-services/article.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import {
  IMAGENOUPLOAD,
  MatSnackBarSuccessConfig,
  NoJpgFormatImage,
} from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { Inventory } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { MyValidators } from '@billing-utils/validator';

@Component({
  selector: 'app-basic-info-articulo',
  templateUrl: './basic-info-articulo.component.html',
  styleUrls: ['./basic-info-articulo.component.scss'],
})
export class BasicInfoArticleComponent implements OnInit {
  formCrudArticle!: FormGroup;
  urlLink: string = '';
  validArticle = false;
  imageArticleURL = IMAGENOUPLOAD;
  noImage = true;
  inventories: Inventory[] = [];
  isNewArticle = false;

  private buildForm() {
    const today = new Date().toJSON().split('T')[0];
    this.formCrudArticle = this.formBuilder.group({
      codart: [
        '',
        [Validators.required],
        MyValidators.AvailableCodartArticle(this.articuloService),
      ],
      typinv: ['', [Validators.required]],
      abrevi: ['', [Validators.required]],
      descri: ['', [Validators.required]],
      codext: ['', [Validators.required]],
      codbar: ['', []],
      codean: ['', []],
      registdate: [today, [Validators.required]],
      cstock: ['', [Validators.required]],
      codprv: ['', []],
      codman: ['', []],
      coduni: ['', [Validators.required]],
      stocknegative: [false, []],
      editdescri: [false, []],
      printcomment: [false, []],
      image: ['', []],
      observ: ['', []],
      commen: ['', []],
      status: ['', []],
      createby: [{ value: '', disabled: true }, []],
      updateby: [{ value: '', disabled: true }, []],
      createat: [{ value: '', disabled: true }, []],
      updateat: [{ value: '', disabled: true }, []],
    });
  }

  constructor(
    private articuloService: ArticleService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) data: ArticleBasic,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ) {
    this.inventories =
      this.defaultValuesService.getLocalStorageValue('inventories');
    this.buildForm();
    this.isNewArticle = data.isNewArticle;
    if (data.article && !this.isNewArticle) {
      this.formCrudArticle.patchValue({
        ...data.article,
        registdate: this.returnDate(data.article.registdate)
          .toISOString()
          .substring(0, 10),
        stocknegative: data.article.stocknegative === 'Y' ? true : false,
        editdescri: data.article.editdescri === 'Y' ? true : false,
        printcomment: data.article.printcomment === 'Y' ? true : false,
      });
      this.codart?.disable();
    }
  }
  ngOnInit(): void {}

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudArticle.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date)
  }

  returnDate(date: number[] | Date): Date {
    if (date instanceof Date) {
      return date;
    }
    const aux: Date = MyDate.convertToCustomDateShort(date);
    // Si la registdate recibida es Valida ... ( Asincronismo )
    return aux;
  }

  saveArticle() {
    if (this.formCrudArticle.invalid) {
      this.formCrudArticle.markAllAsTouched();
      if (this.isNewArticle && this.codart?.hasError('not_available')) {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: {
            status: 0,
            message: 'The article code is already registered',
          },
        });
      }
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      return;
    }
    const insertArticle = this.formCrudArticle.getRawValue();
    insertArticle.stocknegative =
      insertArticle.stocknegative === true ? 'Y' : 'N';
    insertArticle.editdescri = insertArticle.editdescri === true ? 'Y' : 'N';
    insertArticle.printcomment =
      insertArticle.printcomment === true ? 'Y' : 'N';
    this.globalStatusService.setLoading(true);
    if (this.isNewArticle) {
      this.articuloService.postSave(insertArticle).subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          if (data.status >= 0) {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.closeDialog();
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
    } else {
      this.articuloService
        .putUpdate(insertArticle.codart, insertArticle)
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
              this.closeDialog();
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
  }

  selectedImage(event: any) {
    if (event?.target) {
      const data: File = event.target.files[0];
      if (data) {
        const format = data.name.split('.').pop()?.toLowerCase();
        if (format === 'jpg') {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            try {
              const fileContent: ArrayBuffer = e.target.result;
              this.imageArticleURL = URL.createObjectURL(data);
              this.image?.setValue(Array.from(new Uint8Array(fileContent)));
            } catch (error) {
              console.error('Error during file loading:', error);
            }
          };
          reader.readAsArrayBuffer(data);
          this.noImage = false;
        } else {
          event.target.value = null;
          this.imageArticleURL = IMAGENOUPLOAD;
          this.noImage = true;
          this.dialog.open(DialogErrorAlertComponent, NoJpgFormatImage);
        }
      }
    }
  }

  resetImage() {
    this.image?.setValue(null);
    this.imageArticleURL = ''; // Restablecer la URL de la imagen
    this.noImage = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get codart() {
    return this.formCrudArticle.get('codart');
  }
  get typinv() {
    return this.formCrudArticle.get('typinv');
  }
  get abrevi() {
    return this.formCrudArticle.get('abrevi');
  }
  get descri() {
    return this.formCrudArticle.get('descri');
  }
  get codext() {
    return this.formCrudArticle.get('codext');
  }
  get codbar() {
    return this.formCrudArticle.get('codbar');
  }
  get registdate() {
    return this.formCrudArticle.get('registdate');
  }
  get cstock() {
    return this.formCrudArticle.get('cstock');
  }
  get codprv() {
    return this.formCrudArticle.get('codprv');
  }
  get codman() {
    return this.formCrudArticle.get('codman');
  }
  get codund() {
    return this.formCrudArticle.get('codund');
  }
  get image() {
    return this.formCrudArticle.get('image');
  }
  get observ() {
    return this.formCrudArticle.get('observ');
  }
  get commen() {
    return this.formCrudArticle.get('commen');
  }
  get status() {
    return this.formCrudArticle.get('status');
  }
  get createby() {
    return this.formCrudArticle.get('createby');
  }
  get updateby() {
    return this.formCrudArticle.get('updateby');
  }
  get createat() {
    return this.formCrudArticle.get('createat');
  }
  get updateat() {
    return this.formCrudArticle.get('updateat');
  }
}
