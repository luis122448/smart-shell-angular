import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatsnackbarMessageComponent } from '@shared-components/matsnackbar-message/matsnackbar-message.component';
import { DefaultValuesService } from '../../services/default-values.service';
import { SellerService } from '@billing-services/vendedor.service';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { TypeInventoryService } from '@billing-services/type-inventory.service';
import { ListPriceService } from '@billing-services/list-price.service';
import { TypeCommercialDocumentService } from '@billing-services/type-commercial-document.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  fromAuthLogin!: FormGroup;
  formVerifyCode!: FormGroup;
  codver = '';
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  LoginIn = true;
  // Verrify Code
  verificationCode: string[] = new Array(6);

  private buildForm() {
    this.fromAuthLogin = this.formBuilder.group({
      coduser: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private buildFormVerify() {
    this.formVerifyCode = this.formBuilder.group({
      coduser: [{ value: '', disabled: true }, [Validators.required]],
      codver: [
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
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
    // Default-Values
    private typeCommercialDocumentService: TypeCommercialDocumentService,
    private sellerService: SellerService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private reasonCommercialDocumentService: ReasonCommercialDocumentService,
    private typeInventoryService: TypeInventoryService,
    private listPriceService: ListPriceService
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
    if (this.fromAuthLogin.valid) {
      this.globalStatusService.setLoading(true);
      this.authService
        .postLogin(this.coduser?.value, this.password?.value)
        .subscribe({
          next: (data) => {
            if (data.status <= 0) {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: data
              });
            } else {
              this.verifyCoduser?.setValue(data.coduser);
              this.codver = data.verifyCode;
              this.LoginIn = false;
              this.matSnackBar.openFromComponent(MatsnackbarMessageComponent, {
                data: `Codigo de Verificacion : ${data.verifyCode}`,
                duration: 7500000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
            }
            this.globalStatusService.setLoading(false);
          },
          error: err => {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: err
            });
            this.globalStatusService.setLoading(false);
          },
        });
    } else {
      this.fromAuthLogin.markAllAsTouched();
    }
  }

  doVerifyCode() {
    this.verifyCodver?.setValue(this.verificationCode.join(''));
    if (this.formVerifyCode.valid) {
      this.globalStatusService.setLoading(true);
      this.authService
        .postVerifyCode(this.verifyCoduser?.value, this.verifyCodver?.value)
        .subscribe({
          next: async (data) => {
            if (data.status <= 0) {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: data
              });
            } else {
              await this.onUploadDefaultValues();
              this.router.navigate(['/billing']);
              this.matSnackBar.openFromComponent(
                MatsnackbarSuccessComponent,
                MatSnackBarSuccessConfig
              );
            }
            this.globalStatusService.setLoading(false);
          },
          error: err => {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: err
            });
            this.globalStatusService.setLoading(false);
          },
        });
    } else {
      this.formVerifyCode.markAllAsTouched();
    }
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

  async onUploadDefaultValues() {
    await this.sellerService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'sellers',
          data.list.map((data) => {
            return {
              codsel: data.codsel,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: 'N',
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.typeCommercialDocumentService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'documents',
          data.list.map((data) => {
            return {
              typcomdoc: data.typcomdoc,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: 'N',
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.serieCommercialDocumentService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'series',
          data.list.map((data) => {
            return {
              typcomdoc: data.typcomdoc,
              serie: data.serie,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: data.defaul,
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.reasonCommercialDocumentService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'reasons',
          data.list.map((data) => {
            return {
              typcomdoc: data.typcomdoc,
              ingsalcom: data.ingsalcom,
              reacomdoc: data.reacomdoc,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: data.defaul,
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.typeInventoryService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'inventories',
          data.list.map((data) => {
            return {
              typinv: data.typinv,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: data.defaul,
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.listPriceService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'listPrices',
          data.list.map((data) => {
            return {
              codlistprice: data.codlistprice,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: data.defaul,
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
    await this.typeCommercialDocumentService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setCookieValue(
          'documents',
          data.list.map((data) => {
            return {
              typcomdoc: data.typcomdoc,
              abrevi: data.abrevi,
              descri: data.descri,
              defaul: 'N',
            };
          })
        );
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err,
        });
      },
    });
  }

  get coduser() {
    return this.fromAuthLogin.get('coduser');
  }
  get password() {
    return this.fromAuthLogin.get('password');
  }
  get verifyCoduser() {
    return this.formVerifyCode.get('coduser');
  }
  get verifyCodver() {
    return this.formVerifyCode.get('codver');
  }
}
