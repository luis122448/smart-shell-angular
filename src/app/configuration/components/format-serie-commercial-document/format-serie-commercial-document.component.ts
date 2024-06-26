import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeSerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { Branch, Document } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { FormatCommercialDocumentService } from '../../services/format-commercial-document.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { FormatCommercialDocument } from '../../models/format-commercial-document';

import {
  IMAGENOUPLOAD,
  MatSnackBarSuccessConfig,
} from '@billing-utils/constants';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openPdfFileString } from '@billing-utils/function';
import {
  ApiResponseArrayBuffer,
  ApiResponseByte,
} from '@billing-models/api-reponse.model';
import { GlobalStatusService } from '@billing-services/global-status.service';

@Component({
  selector: 'app-format-serie-commercial-document',
  templateUrl: './format-serie-commercial-document.component.html',
  styleUrls: ['./format-serie-commercial-document.component.scss'],
})
export class FormatSerieCommercialDocumentComponent implements OnInit {
  @Input() inputTypcomdoc: number = 0;
  @Input() inputSerie: string = '';
  @Output() changeTypeFormatCommercialDocument = new EventEmitter<number>();
  @Output() changeView = new EventEmitter<ChangeSerieCommercialDocument>();

  formCrudSerieCommercialDocument!: FormGroup;
  listCommercialDocument: Document[] = [];
  listBranches: Branch[] = [];
  listFormatCommercialDocument: FormatCommercialDocument[] = [];
  formatCommercialDocumnet: FormatCommercialDocument | undefined;

  nameFormatCommercialDocument: string = '';
  urlFormatCommercialDocument: string = IMAGENOUPLOAD;

  private buildForm(typcomdoc: number = 0, serie: string = '') {
    this.formCrudSerieCommercialDocument = this.formBuilder.group({
      typcomdoc: [{ value: typcomdoc, disabled: typcomdoc != 0 }],
      serie: [{ value: serie, disabled: serie != '' }],
      abrevi: [''],
      descri: [''],
      codbranch: [''],
      typformat: [''],
    });
  }

  constructor(
    private defaultValuesService: DefaultValuesService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private formatCommercialDocumentService: FormatCommercialDocumentService,
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.buildForm(this.inputTypcomdoc, this.inputSerie);
    this.listCommercialDocument =
      this.defaultValuesService.getLocalStorageValue('documents');
    this.listBranches =
      this.defaultValuesService.getLocalStorageValue('branches');
  }

  ngOnInit(): void {
    if (this.inputTypcomdoc != 0 && this.inputSerie != '') {
      this.serieCommercialDocumentService
        .getById(this.inputTypcomdoc, this.inputSerie)
        .subscribe({
          next: (data) => {
            if (data.status <= 0) {
              this.dialog.open(DialogErrorAlertComponent, {
                width: '400px',
                data: data,
              });
            }
            this.formCrudSerieCommercialDocument.patchValue({
              typcomdoc: data.object?.typcomdoc,
              serie: data.object?.serie,
              abrevi: data.object?.abrevi,
              descri: data.object?.descri,
              codbranch: data.object?.codbranch,
              typformat: data.object?.typformat,
            });
            this.typcomdoc?.disable();
            this.serie?.disable();
            this.codbranch?.disable();
          }
        });
      this.getFormatCommercialDocument(this.inputTypcomdoc);
    }
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formCrudSerieCommercialDocument.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  changeTypeDocumentCommercial() {
    this.listFormatCommercialDocument = [];
    this.formatCommercialDocumnet = undefined;
    this.nameFormatCommercialDocument = '';
    this.urlFormatCommercialDocument = IMAGENOUPLOAD;
    this.formCrudSerieCommercialDocument.patchValue({
      typformat: '',
    });
    this.getFormatCommercialDocument(this.typcomdoc?.value);
    this.changeTypeFormatCommercialDocument.emit(this.typcomdoc?.value);
  }

  getFormatCommercialDocument(typcomdoc: number) {
    this.formatCommercialDocumentService.getByTypcomdoc(typcomdoc).subscribe({
      next: (data) => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
        }
        this.listFormatCommercialDocument = data.list;
        this.formatCommercialDocumnet = this.listFormatCommercialDocument.find(
          (data) => data.defaul == 'Y'
        );
        this.formCrudSerieCommercialDocument.patchValue({
          typformat: this.formatCommercialDocumnet?.typformat,
        });
        this.getImage();
      },
    });
  }

  getImage() {
    this.nameFormatCommercialDocument =
      this.formatCommercialDocumnet?.descri || '';
    if (this.formatCommercialDocumnet?.image) {
      const imageUrl = `data:image/jpeg;base64,${this.formatCommercialDocumnet?.image}`;
      this.urlFormatCommercialDocument = imageUrl;
    }
  }

  getDownloadPdf() {
    this.globalStatusService.setLoading(true);
    const file: ApiResponseByte = {
      status: 1,
      message: 'success',
      logMessage: 'success',
      logTime: new Date(),
      logUser: 'user',
      bytes: this.formatCommercialDocumnet?.pdf || '',
      format: 'application/pdf',
      name: `${this.formatCommercialDocumnet?.descri}`,
      extension: 'pdf',
    };
    openPdfFileString(file)
      .then(() => {
        this.matSnackBar.openFromComponent(
          MatsnackbarSuccessComponent,
          MatSnackBarSuccessConfig
        );
      })
      .catch((err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { status: -1, message: err.meesage },
        });
      });

  }

  changeFormatCommercialDocument() {
    this.formatCommercialDocumnet = this.listFormatCommercialDocument.find(
      (data) => data.typformat == this.typformat?.value
    );
    this.changeTypeFormatCommercialDocument.emit(this.typcomdoc?.value);
    this.getImage();
  }

  get typcomdoc() {
    return this.formCrudSerieCommercialDocument.get('typcomdoc');
  }
  get serie() {
    return this.formCrudSerieCommercialDocument.get('serie');
  }
  get abrevi() {
    return this.formCrudSerieCommercialDocument.get('abrevi');
  }
  get descri() {
    return this.formCrudSerieCommercialDocument.get('descri');
  }
  get codbranch() {
    return this.formCrudSerieCommercialDocument.get('codbranch');
  }
  get typformat() {
    return this.formCrudSerieCommercialDocument.get('typformat');
  }
}
