import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '@shared-components/not-found/not-found.component';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkModule } from './cdk/cdk.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ButtonStandardComponent } from '@shared-components/button-standard/button-standard.component';
import { InputSearchStandardComponent } from '@shared-components/input-search-standard/input-search-standard.component';
import { ThemeSwitcherComponent } from '@shared-components/theme-switcher/theme-switcher.component';
import { AlertStandardComponent } from '@shared-components/alert-standard/alert-standard.component';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { ButtonImportSbsComponent } from '@shared-components/button-import-sbs/button-import-sbs.component';
import { ButtonImportSunatComponent } from '@shared-components/button-import-sunat/button-import-sunat.component';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { ButtonQuestionComponent } from '@shared-components/button-question/button-question.component';
import { MatsnackbarMessageComponent } from '@shared-components/matsnackbar-message/matsnackbar-message.component';
import { ButtonOperacComponent } from '@shared-components/button-operac/button-operac.component';
import { DialogQuestionComponent } from '@shared-components/dialog-question/dialog-question.component';
import { HeaderComponent } from '@shared-components/header/header.component';
import { FooterComponent } from '@shared-components/footer/footer.component';
import { VideoPlayerComponent } from '@shared-components/video-player/video-player.component';
import { StackTechComponent } from '@shared-components/stack-tech/stack-tech.component';
import { DialogQuestionCommentComponent } from '@shared-components/dialog-question-comment/dialog-question-comment.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { SiderbarLeftComponent } from './siderbar/siderbar-left/siderbar-left.component';
import { SiderbarRightComponent } from './siderbar/siderbar-right/siderbar-right.component';
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
    StackTechComponent,
    DialogQuestionCommentComponent,
    SiderbarLeftComponent,
    SiderbarRightComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    CdkModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
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
    VideoPlayerComponent,
    StackTechComponent,
    SiderbarLeftComponent,
    SiderbarRightComponent
  ]
})
export class SharedModule { }
