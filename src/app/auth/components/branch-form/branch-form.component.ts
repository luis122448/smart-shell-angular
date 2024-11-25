import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Branch, Company } from '@auth/models/default-values.model';
import { DefaultValuesService } from '@auth/services/default-values.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss'
})
export class BranchFormComponent {

  branches: Branch[] = [];
  company: Company | undefined;
  defaultBranch: number = 0;
  fromBranchLogin!: FormGroup;

  private buildForm(company: string, codbranch: number = 0) {
    this.fromBranchLogin = this.formBuilder.group({
      company: [company, [Validators.required]],
      codbranch: [codbranch, [Validators.required, Validators.min(1)]]
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private defaultValuesService: DefaultValuesService
  ) {
    this.company = this.defaultValuesService.getLocalStorageValue('company')[0];
    this.branches = this.defaultValuesService.getLocalStorageValue('branches');
    this.defaultBranch = this.branches.find(branch => branch.defaul = 'Y')?.codbranch ?? 0;
    if(this.company){
      this.buildForm(this.company.company, this.defaultBranch);
    } else {
      this.dialog.open(DialogErrorAlertComponent, {
        data: {
          status: -2,
          message: 'Company information could not be loaded, please log in again'
        }
      });
      this.router.navigate(['/login']);
    }
  }

  isInputInvalid(input: string): boolean {
    return this.fromBranchLogin.get(input)?.invalid ?? false;
  }

  selectedBranch(){
    if (this.fromBranchLogin.invalid) {
      this.fromBranchLogin.markAllAsTouched();
      return;
    }
    const branch = this.fromBranchLogin.get('codbranch')?.value;
    this.defaultValuesService.setCookie('selectedBranch', branch);
    this.router.navigate(['/billing']);
    this.matSnackBar.openFromComponent(
      MatsnackbarSuccessComponent,
      MatSnackBarSuccessConfig
    );
  }

  get codbranch() {
    return this.fromBranchLogin.get('codbranch');
  }

}
