import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RecoveryFormComponent } from './components/recovery-form/recovery-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { BranchFormComponent } from './components/branch-form/branch-form.component';
import { BranchComponent } from './pages/branch/branch.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RecoveryFormComponent,
    RegisterFormComponent,
    ForgotPasswordFormComponent,
    LoginComponent,
    RecoveryComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    BranchFormComponent,
    BranchComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule,
  ]
})
export class AuthModule { }
