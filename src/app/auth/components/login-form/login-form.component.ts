import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { faPen, faEye, faEyeSlash, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { MatsnackbarMessageComponent } from '@shared-components/matsnackbar-message/matsnackbar-message.component';
import { DefaultValuesService } from '../../services/default-values.service';
import { MetadataModel } from "@auth/models/default-values.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  fromAuthLogin!: FormGroup;
  formVerifyCode!: FormGroup;
  code = '';
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faAddressCard = faAddressCard;
  showPassword = false;
  LoginIn = true;
  // Verrify Code
  verificationCode: string[] = new Array(6);

  private buildForm() {
    this.fromAuthLogin = this.formBuilder.group({
      company: ['0000000001', [Validators.required]],
      coduser: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private buildFormVerify() {
    this.formVerifyCode = this.formBuilder.group({
      company: [{ value: '0000000001', disabled: true },, [Validators.required]],
      coduser: [{ value: '', disabled: true }, [Validators.required]],
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
  ) {
    this.buildForm();
    this.buildFormVerify();
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.fromAuthLogin.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  isInputInvalidVerify(fieldName: string): boolean {
    const field = this.formVerifyCode.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  doLogin() {
    if (this.fromAuthLogin.invalid) {
      this.fromAuthLogin.markAllAsTouched();
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'Y' },
      });
      return;
    }
    this.authService
      .postLogin(this.company?.value, this.coduser?.value, this.password?.value)
      .subscribe({
        next: async (data) => {
          if (data.status < 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          } else if (data.status === 0) {
            this.verifyCoduser?.setValue(data.object.coduser);
            this.code = data.object.verifyCode;
            this.LoginIn = false;
            this.matSnackBar.openFromComponent(MatsnackbarMessageComponent, {
              data: `Verification code : ${data.object.verifyCode}`,
              duration: 7500000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            await this.onUploadDefaultValues(data.metadata);
            this.router.navigate(['/billing']);
          }
        }
      });
  }

  doVerifyCode() {
    this.verifycode?.setValue(this.verificationCode.join(''));
    if (this.formVerifyCode.invalid) {
      this.fromAuthLogin.markAllAsTouched();
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'Y' },
      });
      return;
    }
    this.authService
      .postVerifyCode(this.verifyCompany?.value, this.verifyCoduser?.value, this.verifycode?.value)
      .subscribe({
        next: async (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          } else {
            await this.onUploadDefaultValues(data.metadata);
            this.router.navigate(['/billing']);
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
          }
        }
      });
  }

  public onCodeInputChange(index: number, event: any): void {
    const value = event.target.value;

    // Si se ingresó un valor y no es el último campo de entrada, pasa automáticamente al siguiente campo
    if (value && index < this.verificationCode.length - 1) {
      // const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      const nextInput = event.target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  public onBackspace(index: number, event: any){
    const value = event.target.value;
    if (!value && index > 0) {
      const previousInput = event.target.previousElementSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  async onUploadDefaultValues(metadata: MetadataModel | null) {
    await this.defaultValuesService.removeAllLocalStorage();
    if (!metadata) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { status: -1, message: 'No metadata' },
      });
      return;
    }
    this.defaultValuesService.setLocalStorageValue(
      'currencies',
      metadata.currency.map((data) => {
        return {
          codcur: data.codcur,
          abrevi: data.abrevi,
          descri: data.descri,
          codext: data.codext,
          symbol: data.symbol,
          defaul: data.defaul,
        };
      })
    );
    // this.defaultValuesService.setLocalStorageValue(
    //   'branches',
    //   metadata.branch.map((data) => {
    //     return {
    //       codbranch: data.codbranch,
    //       abrevi: data.abrevi,
    //       descri: data.descri,
    //       defaul: data.defaul,
    //     };
    //   })
    // );
    this.defaultValuesService.setLocalStorageValue(
      'warehouses',
        metadata.warehouse.map((data) => {
          return {
            typinv: data.typinv,
            codwarehouse: data.codwarehouse,
            abrevi: data.abrevi,
            descri: data.descri,
            defaul: data.defaul,
          };
        })
    );
    this.defaultValuesService.setLocalStorageValue(
      'sellers',
      metadata.seller.map((data) => {
        return {
          codsel: data.codsel,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: 'N',
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'documents',
      metadata.typeCommercialDocument.map((data) => {
        return {
          typcomdoc: data.typcomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: 'N',
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'series',
      metadata.serieCommercialDocument.map((data) => {
        return {
          typcomdoc: data.typcomdoc,
          serie: data.serie,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'reasons',
      metadata.reasonCommercialDocument.map((data) => {
        return {
          typcomdoc: data.typcomdoc,
          inout: data.inout,
          reacomdoc: data.reacomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'situations',
      metadata.situationCommercialDocument.map((data) => {
        return {
          typcomdoc: data.typcomdoc,
          sitcomdoc: data.sitcomdoc,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: 'N',
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'inventories',
      metadata.typeInventory.map((data) => {
        return {
          typinv: data.typinv,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'warehouses',
      metadata.warehouse.map((data) => {
        return {
          typinv: data.typinv,
          codwarehouse: data.codwarehouse,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'listprices',
      metadata.listPrice.map((data) => {
        return {
          codlistprice: data.codlistprice,
          abrevi: data.abrevi,
          descri: data.descri,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue(
      'typeBusinessPartners',
      metadata.typeBusinessPartner.map((data) => {
        return {
          typbuspar: data.typbuspar,
          abrevi: data.abrevi,
          descri: data.descri,
          codext: data.codext,
          defaul: data.defaul,
        };
      })
    );
    this.defaultValuesService.setLocalStorageValue('user', [metadata.user]);
  }

  get company() {
    return this.fromAuthLogin.get('company');
  }
  get coduser() {
    return this.fromAuthLogin.get('coduser');
  }
  get password() {
    return this.fromAuthLogin.get('password');
  }
  get verifyCompany() {
    return this.formVerifyCode.get('company');
  }
  get verifyCoduser() {
    return this.formVerifyCode.get('coduser');
  }
  get verifycode() {
    return this.formVerifyCode.get('code');
  }
}
