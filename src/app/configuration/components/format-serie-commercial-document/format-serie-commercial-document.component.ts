import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeSerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { Branch, Document } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { FormatCommercialDocumentService } from '../../services/format-commercial-document.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { FormatCommercialDocument } from '../../models/format-commercial-document';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { IMAGENOUPLOAD } from '@billing-utils/constants';

@Component({
  selector: 'app-format-serie-commercial-document',
  templateUrl: './format-serie-commercial-document.component.html',
  styleUrls: ['./format-serie-commercial-document.component.scss']
})
export class FormatSerieCommercialDocumentComponent implements OnInit, OnChanges{

  @Input() inputTypcomdoc: number = 0
  @Input() inputSerie: string = ''
  @Input() inputSave: boolean = false
  @Output() changeView = new EventEmitter<ChangeSerieCommercialDocument>();

  formCrudSerieCommercialDocument!: FormGroup
  listCommercialDocument: Document[] = []
  listBranches: Branch[] = []
  listFormatCommercialDocument: FormatCommercialDocument[] = []
  formatCommercialDocumnet: FormatCommercialDocument | undefined

  nameFormatCommercialDocument: string = ''
  urlFormatCommercialDocument: string = IMAGENOUPLOAD

  private buildForm(typcomdoc: number = 0, serie: string = ''){
    this.formCrudSerieCommercialDocument = this.formBuilder.group({
      typcomdoc: [{value: typcomdoc,disabled: (typcomdoc!=0)}],
      serie: [{value: serie,disabled: (serie!='')}],
      abrevi: [''],
      descri: [''],
      codbranch: [''],
      typformat: ['']
    })
  }

  constructor(
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private formatCommercialDocumentService: FormatCommercialDocumentService,
    private dialog: Dialog,
    private formBuilder: FormBuilder
  ) {
    this.buildForm(this.inputTypcomdoc,this.inputSerie)
    this.listCommercialDocument = this.defaultValuesService.getCookieValue('documents')
    this.listBranches = this.defaultValuesService.getCookieValue('branches')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputSave'] && changes['inputSave'].currentValue){
      this.saveSerieCommercialDocument()
    }
  }

  ngOnInit(): void {
    if (this.inputTypcomdoc!=0 && this.inputSerie!=''){
      this.globalStatusService.setLoading(true)
      this.serieCommercialDocumentService.getById(this.inputTypcomdoc,this.inputSerie)
      .subscribe({
        next: data =>{
          if (data.status<=0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          }
          this.formCrudSerieCommercialDocument.patchValue({
            typcomdoc: data.object?.typcomdoc,
            serie: data.object?.serie,
            abrevi: data.object?.abrevi,
            descri: data.object?.descri,
            codbranch: data.object?.codbranch,
            typformat: data.object?.typformat
          })
          this.typcomdoc?.disable()
          this.serie?.disable()
          this.codbranch?.disable()
          this.globalStatusService.setLoading(false)
        },
        error: err =>{
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
          this.globalStatusService.setLoading(false)
        }
      })
      this.getFormatCommercialDocument(this.inputTypcomdoc)
    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudSerieCommercialDocument.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  changeTypeDocumentCommercial(){
    this.listFormatCommercialDocument = []
    this.formatCommercialDocumnet = undefined
    this.nameFormatCommercialDocument = ''
    this.urlFormatCommercialDocument = IMAGENOUPLOAD
    this.formCrudSerieCommercialDocument.patchValue({
      typformat: ''
    })
    this.getFormatCommercialDocument(this.typcomdoc?.value)
  }

  getFormatCommercialDocument(typcomdoc: number){
    this.globalStatusService.setLoading(true)
    this.formatCommercialDocumentService.getByTypcomdoc(typcomdoc)
    .subscribe({
      next: data =>{
        if (data.status<=0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        }
        this.listFormatCommercialDocument = data.list
        this.formatCommercialDocumnet = this.listFormatCommercialDocument.find(data => data.defaul == 'Y')
        this.formCrudSerieCommercialDocument.patchValue({
          typformat: this.formatCommercialDocumnet?.typformat
        })
        this.nameFormatCommercialDocument = this.formatCommercialDocumnet?.descri || ''
        this.urlFormatCommercialDocument = this.formatCommercialDocumnet?.url || ''
        this.globalStatusService.setLoading(false)
      },
      error: err =>{
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
        this.globalStatusService.setLoading(false)
      }
    })
  }

  changeFormatCommercialDocument(){
    this.formatCommercialDocumnet = this.listFormatCommercialDocument.find(data => data.typformat == this.typformat?.value)
    this.nameFormatCommercialDocument = this.formatCommercialDocumnet?.descri || ''
    this.urlFormatCommercialDocument = this.formatCommercialDocumnet?.url || ''
  }

  saveSerieCommercialDocument(){
    this.globalStatusService.setLoading(true)
    this.globalStatusService.setLoading(false)
  }

  get typcomdoc(){
    return this.formCrudSerieCommercialDocument.get('typcomdoc')
  }
  get serie(){
    return this.formCrudSerieCommercialDocument.get('serie')
  }
  get abrevi(){
    return this.formCrudSerieCommercialDocument.get('abrevi')
  }
  get descri(){
    return this.formCrudSerieCommercialDocument.get('descri')
  }
  get codbranch(){
    return this.formCrudSerieCommercialDocument.get('codbranch')
  }
  get typformat(){
    return this.formCrudSerieCommercialDocument.get('typformat')
  }

}
