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
import { faPen, faEye, faEyeSlash, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { MatsnackbarMessageComponent } from '@shared-components/matsnackbar-message/matsnackbar-message.component';
import { DefaultValuesService } from '../../services/default-values.service';
import { SellerService } from '@billing-services/vendedor.service';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { TypeInventoryService } from '@billing-services/type-inventory.service';
import { ListPriceService } from '@billing-services/list-price.service';
import { TypeCommercialDocumentService } from '@billing-services/type-commercial-document.service';
import { SituationCommercialDocumentService } from '@billing-services/situation-commercial-document.service';
import { TypeBusinessPartnerService } from '@billing-services/type-business-partner.service';
import { UserService } from '@billing-services/user.service';

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
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
    // Default-Values
    private typeCommercialDocumentService: TypeCommercialDocumentService,
    private sellerService: SellerService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private reasonCommercialDocumentService: ReasonCommercialDocumentService,
    private situationCommercialDocumentService: SituationCommercialDocumentService,
    private typeInventoryService: TypeInventoryService,
    private listPriceService: ListPriceService,
    private typeBusinessPartnerService: TypeBusinessPartnerService,
    private userService: UserService
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
    this.globalStatusService.setLoading(true);
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
            await this.onUploadDefaultValues();
            this.router.navigate(['/billing']);
          }
        },
        error: err => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error
          });
          this.globalStatusService.setLoading(false);
        },
        complete: () => {
          this.globalStatusService.setLoading(false);
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
    this.globalStatusService.setLoading(true);
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
            await this.onUploadDefaultValues();
            this.router.navigate(['/billing']);
            this.matSnackBar.openFromComponent(
              MatsnackbarSuccessComponent,
              MatSnackBarSuccessConfig
            );
          }
        },
        error: err => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.globalStatusService.setLoading(false);
        },
        complete: () => {
          this.globalStatusService.setLoading(false);
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

  async onUploadDefaultValues() {
    await this.defaultValuesService.removeAllLocalStorage();
    await this.sellerService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setLocalStorageValue(
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
        this.defaultValuesService.setLocalStorageValue(
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
        this.defaultValuesService.setLocalStorageValue(
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
        this.defaultValuesService.setLocalStorageValue(
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
    await this.situationCommercialDocumentService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setLocalStorageValue(
          'situations',
          data.list.map((data) => {
            return {
              typcomdoc: data.typcomdoc,
              sitcomdoc: data.sitcomdoc,
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
    await this.typeInventoryService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setLocalStorageValue(
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
        this.defaultValuesService.setLocalStorageValue(
          'listprices',
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
    await this.typeBusinessPartnerService.getAll().subscribe({
      next: (data) => {
        this.defaultValuesService.setLocalStorageValue(
          'typeBusinessPartners',
          data.list.map((data) => {
            return {
              typbuspar: data.typbuspar,
              abrevi: data.abrevi,
              descri: data.descri,
              codext: data.codext,
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
    await this.userService.getProfile().subscribe({
      next: (data) => {
        this.defaultValuesService.setLocalStorageValue('user', [data.object]);
      },
      error: err => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
      },
    })
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
