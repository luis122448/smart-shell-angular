import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MyDate } from '@billing-utils/date';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { Dialog } from '@angular/cdk/dialog';
import { Branch, Document } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarSuccessConfig, NoDataFoundMessageDialog } from '@billing-utils/constants';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ChangeSerieCommercialDocument, SerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';

@Component({
  selector: 'app-basic-serie-commercial-document',
  templateUrl: './basic-serie-commercial-document.component.html',
  styleUrls: ['./basic-serie-commercial-document.component.scss']
})
export class BasicSerieCommercialDocumentComponent implements OnInit, OnChanges {

  @Input() inputTypcomdoc: number = 0
  @Input() inputTypformat: number = 0
  @Input() inputSerie: string = ''
  @Input() inputSave: boolean = false
  @Output() changeView = new EventEmitter<ChangeSerieCommercialDocument>();

  formCrudSerieCommercialDocument!: FormGroup
  listCommercialDocument: Document[] = []
  listBranches: Branch[] = []

  private buildForm(typcomdoc: number = 0, serie: string = ''){
    this.formCrudSerieCommercialDocument = this.formBuilder.group({
      typcomdoc: [{value: typcomdoc,disabled: (typcomdoc!=0)},[Validators.required]],
      serie: [{value: serie,disabled: (serie!='')},[Validators.required]],
      abrevi: ['',[Validators.required]],
      descri: ['',[Validators.required]],
      codext: ['',[Validators.required]],
      codbranch: ['',[Validators.required]],
      docelectr: [false,[]],
      typcorrel: ["A",[]],
      nrocorrel: [1,[]],
      typformat: ['',[Validators.required]],
      observ: ['',[]],
      commen: ['',[]],
      defaul: [false,[]],
      status: [true,[]],
      createby: [{value:'',disabled: true},[]],
      updateby: [{value:'',disabled: true},[]],
      createat: ['',[]],
      updateat: ['',[]],
    })
  }

  constructor(
    private globalStatusService: GlobalStatusService,
    private defaultValuesService: DefaultValuesService,
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ) {
    this.buildForm(this.inputTypcomdoc,this.inputSerie)
    this.listCommercialDocument = this.defaultValuesService.getLocalStorageValue('documents')
    this.listBranches = this.defaultValuesService.getLocalStorageValue('branches')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputSave'] && changes['inputSave'].currentValue){
      this.saveSerieCommercialDocument()
    }
    if(changes['inputTypformat'] && changes['inputTypformat'].currentValue){
      console.log('inputTypformat',changes['inputTypformat'].currentValue)
      this.typformat?.setValue(changes['inputTypformat'].currentValue)
    }
  }

  ngOnInit(): void {
    if (this.inputTypcomdoc!=0 && this.inputSerie!=''){
      this.globalStatusService.setLoading(true)
      this.serieCommercialDocumentService.getById(this.inputTypcomdoc,this.inputSerie)
      .subscribe({
        next: data => {
          if(data.status <= 0){
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
            codext: data.object?.codext,
            codbranch: data.object?.codbranch,
            docelectr: ( data.object?.docelectr == 'Y'),
            typcorrel: data.object?.typcorrel,
            nrocorrel: data.object?.nrocorrel,
            typformat: data.object?.typformat,
            observ: data.object?.observ,
            commen: data.object?.commen,
            defaul: ( data.object?.defaul == 'Y'),
            status: ( data.object?.status == 'Y'),
            createby: data.object?.createby,
            updateby: data.object?.updateby,
            createat: data.object?.createat,
            updateat: data.object?.updateat
          })
          this.typcomdoc?.disable()
          this.serie?.disable()
          this.globalStatusService.setLoading(false)
        },
        error: err => {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
          this.globalStatusService.setLoading(false)
        }
      })
    }
  }


  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudSerieCommercialDocument.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date)
  }

  saveSerieCommercialDocument(){
    if(!this.formCrudSerieCommercialDocument.valid){
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_required_fields: 'S' }
      })
      this.formCrudSerieCommercialDocument.markAllAsTouched()
      return
    }
    this.globalStatusService.setLoading(true)
    const serieCommercialDocument : SerieCommercialDocument = {
      typcomdoc: this.typcomdoc?.value,
      serie: this.serie?.value,
      abrevi: this.abrevi?.value,
      descri: this.descri?.value,
      codext: this.codext?.value,
      codbranch: this.codbranch?.value,
      docelectr: (this.docelectr?.value)?'Y':'N',
      typcorrel: this.typcorrel?.value,
      nrocorrel: this.nrocorrel?.value,
      typformat: this.typformat?.value,
      observ: this.observ?.value,
      commen: this.commen?.value,
      defaul: (this.defaul?.value)?'Y':'N',
      status: (this.status?.value)?'Y':'N'
    }
    console.log('save',serieCommercialDocument)
    this.serieCommercialDocumentService.postSave(serieCommercialDocument)
    .subscribe({
      next: data => {
        if(data.status < 0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else {
          this.matSnackBar.openFromComponent(
            MatsnackbarSuccessComponent,
            MatSnackBarSuccessConfig
          );
          this.changeView.emit({
            view: 'search',
            typcomdoc: data.object?.typcomdoc || 0,
            serie: data.object?.serie || ''
          })
        }
      },
      error: err => {
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
        this.globalStatusService.setLoading(false)
      },
      complete: () => {
        this.globalStatusService.setLoading(false)
      }
    })
  }

  closeDialog(){
    this.changeView.emit({
      view: 'search',
      typcomdoc: this.typcomdoc?.value || 0,
      serie: this.serie?.value || ''
    })
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
  get codext(){
    return this.formCrudSerieCommercialDocument.get('codext')
  }
  get codbranch(){
    return this.formCrudSerieCommercialDocument.get('codbranch')
  }
  get docelectr(){
    return this.formCrudSerieCommercialDocument.get('docelectr')
  }
  get typcorrel(){
    return this.formCrudSerieCommercialDocument.get('typcorrel')
  }
  get nrocorrel(){
    return this.formCrudSerieCommercialDocument.get('nrocorrel')
  }
  get typformat(){
    return this.formCrudSerieCommercialDocument.get('typformat')
  }
  get observ(){
    return this.formCrudSerieCommercialDocument.get('observ')
  }
  get commen(){
    return this.formCrudSerieCommercialDocument.get('commen')
  }
  get defaul(){
    return this.formCrudSerieCommercialDocument.get('defaul')
  }
  get status(){
    return this.formCrudSerieCommercialDocument.get('status')
  }
  get createby(){
    return this.formCrudSerieCommercialDocument.get('createby')
  }
  get updateby(){
    return this.formCrudSerieCommercialDocument.get('updateby')
  }
  get createat(){
    return this.formCrudSerieCommercialDocument.get('createat')
  }
  get updateat(){
    return this.formCrudSerieCommercialDocument.get('updateat')
  }

}
