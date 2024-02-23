import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkModule } from './cdk/cdk.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ButtonStandardComponent } from './components/button-standard/button-standard.component';
import { InputSearchStandardComponent } from './components/input-search-standard/input-search-standard.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { AlertStandardComponent } from './components/alert-standard/alert-standard.component';
import { DialogErrorAlertComponent } from './components/dialog-error-alert/dialog-error-alert.component';
import { ButtonImportSbsComponent } from './components/button-import-sbs/button-import-sbs.component';
import { ButtonImportSunatComponent } from './components/button-import-sunat/button-import-sunat.component';
import { MatsnackbarSuccessComponent } from './components/matsnackbar-success/matsnackbar-success.component';
import { DialogDeleteQuestionComponent } from './components/dialog-delete-question/dialog-delete-question.component';
import { ButtonQuestionComponent } from './components/button-question/button-question.component';
import { MatsnackbarMessageComponent } from './components/matsnackbar-message/matsnackbar-message.component';
import { ButtonOperacComponent } from './components/button-operac/button-operac.component';
import { DialogQuestionComponent } from './components/dialog-question/dialog-question.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
@NgModule({
  declarations: [
    NotFoundComponent,
    ButtonStandardComponent,
    InputSearchStandardComponent,
    ThemeSwitcherComponent,
    AlertStandardComponent,
    DialogErrorAlertComponent,
    ButtonImportSbsComponent,
    ButtonImportSunatComponent,
    MatsnackbarSuccessComponent,
    DialogDeleteQuestionComponent,
    ButtonQuestionComponent,
    MatsnackbarMessageComponent,
    ButtonOperacComponent,
    DialogQuestionComponent,
    HeaderComponent,
    FooterComponent,
    VideoPlayerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    CdkModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpParams
  ],
  exports: [
    MaterialModule,
    FontAwesomeModule,
    CdkModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonStandardComponent,
    InputSearchStandardComponent,
    ThemeSwitcherComponent,
    AlertStandardComponent,
    ButtonImportSbsComponent,
    ButtonImportSunatComponent,
    DialogDeleteQuestionComponent,
    ButtonQuestionComponent,
    MatsnackbarMessageComponent,
    ButtonOperacComponent,
    DialogQuestionComponent,
    HeaderComponent,
    FooterComponent,
    VideoPlayerComponent
  ]
})
export class SharedModule { }
