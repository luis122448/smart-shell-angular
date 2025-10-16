import { Component, Inject, OnInit } from '@angular/core';
import { BusinessPartnerService } from '@billing-services/interlocutor-comcercial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessPartnerBasic } from '@billing-models/business-partner.model';

import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import {
  IMAGENOUPLOAD,
  MatSnackBarSuccessConfig,
  NoJpgFormatImage,
} from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { TypeBusinessPartner } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-basic-info-cliente',
  templateUrl: './basic-info-cliente.component.html',
  styleUrls: ['./basic-info-cliente.component.scss'],
})
export class BasicInfoClienteComponent implements OnInit {
  formCrudCliente!: FormGroup;
  urlLink: string = '';
  codbusparId: string = '';
  existeCliente = false;
  imageBusinessPartnerURL = IMAGENOUPLOAD;
  typeBusinessPartners: TypeBusinessPartner[] = [];

  private buildForm() {
    this.formCrudCliente = this.formBuilder.group({
      codbuspar: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S*$/),
        ],
      ],
      typbuspar: ['', [Validators.required]],
      typidedoc: ['', [Validators.required]],
      nroidedoc: ['', [Validators.required]],
      codext: ['', []],
      busnam: ['', [Validators.required]],
      apepat: ['', []],
      apemat: ['', []],
      nombre: ['', []],
      registdate: ['', []],
      poscod: ['', [Validators.required]],
      addres: ['', [Validators.required]],
      codtel: ['', []],
      telefo: ['', []],
      email: ['', []],
      typpaycon: ['', []],
      limcre: ['', []],
      lispre: ['', []],
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
    private formBuilder: FormBuilder,
    private businessPartnerService: BusinessPartnerService,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) private data: BusinessPartnerBasic
  ) {
    this.typeBusinessPartners = this.defaultValuesService.getLocalStorageValue(
      'typeBusinessPartners'
    );
    this.codbusparId = this.data.codbuspar;
    this.buildForm();
  }

  ngOnInit(): void {
    if (!this.data.isNewBussinessPartner) {
      this.businessPartnerService.getById(this.data.codbuspar).subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          } else if (data.object) {
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
            this.formCrudCliente.patchValue({
              ...data.object
            });
            this.codbuspar?.disable();
            if (data.object.image) {
              const imageUrl = `data:image/jpeg;base64,${data.object.image}`;
              this.imageBusinessPartnerURL = imageUrl;
            }
          }
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });

        },
        complete: () => {

        },
      });
      this.existeCliente = true;
    }
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudCliente.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  saveBusinessPartner() {
    if (this.formCrudCliente.invalid) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'S' },
      });
      this.formCrudCliente.markAllAsTouched();
      return;
    }
    if (!this.existeCliente) {
      this.businessPartnerService
        .postSave(this.formCrudCliente.value.getRawValue())
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
            }
          }
        });
    } else {
      this.businessPartnerService
        .putUpdate(this.codbuspar?.value, this.formCrudCliente.getRawValue())
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
            }
          }
        });
    }
    this.dialogRef.close();
  }

  onImageSelected(event: any) {
    if (event?.target) {
      const data: File = event?.target.files[0];

      if (data) {
        // Validando Extencion del Archivo
        const extension = data.name.split('.').pop()?.toLowerCase();
        if (extension === 'jpg') {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const fileContent: ArrayBuffer = e.target.result;
            this.imageBusinessPartnerURL = URL.createObjectURL(data);
            // this.image?.setValue(fileContent)
            this.image?.setValue(Array.from(new Uint8Array(fileContent)));
          };
          reader.readAsArrayBuffer(data);
        } else {
          event.target.value = null;
          this.imageBusinessPartnerURL = IMAGENOUPLOAD;
          this.dialog.open(DialogErrorAlertComponent, NoJpgFormatImage);
        }
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date);
  }

  isDateValid(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  get codbuspar() {
    return this.formCrudCliente.get('codbuspar');
  }
  get typbuspar() {
    return this.formCrudCliente.get('typbuspar');
  }
  get typidedoc() {
    return this.formCrudCliente.get('typidedoc');
  }
  get codext() {
    return this.formCrudCliente.get('codext');
  }
  get busnam() {
    return this.formCrudCliente.get('busnam');
  }
  get apepat() {
    return this.formCrudCliente.get('apepat');
  }
  get apemat() {
    return this.formCrudCliente.get('apemat');
  }
  get nombre() {
    return this.formCrudCliente.get('nombre');
  }
  get registdate() {
    return this.formCrudCliente.get('registdate');
  }
  get poscod() {
    return this.formCrudCliente.get('poscod');
  }
  get addres() {
    return this.formCrudCliente.get('addres');
  }
  get codtel() {
    return this.formCrudCliente.get('codtel');
  }
  get telefo() {
    return this.formCrudCliente.get('telefo');
  }
  get email() {
    return this.formCrudCliente.get('email');
  }
  get typpaycon() {
    return this.formCrudCliente.get('typpaycon');
  }
  get limcre() {
    return this.formCrudCliente.get('limcre');
  }
  get lispre() {
    return this.formCrudCliente.get('lispre');
  }
  get image() {
    return this.formCrudCliente.get('image');
  }
  get observ() {
    return this.formCrudCliente.get('observ');
  }
  get commen() {
    return this.formCrudCliente.get('commen');
  }
  get status() {
    return this.formCrudCliente.get('status');
  }
  get createby() {
    return this.formCrudCliente.get('createby');
  }
  get updateby() {
    return this.formCrudCliente.get('updateby');
  }
  get createat() {
    return this.formCrudCliente.get('createat');
  }
  get updateat() {
    return this.formCrudCliente.get('updateat');
  }
}
