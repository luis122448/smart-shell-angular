import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DataSourceDocumentHeader, DataSourceDocumentDetail } from '../../data/datasource-facbol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacbolGlobalStatusService } from '../../services/facbol-global-status.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { GlobalStatusService } from '../../services/global-status.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Currency } from 'src/app/auth/models/default-values.model';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DialogQuestionComponent } from '@shared/components/dialog-question/dialog-question.component';

@Component({
  selector: 'app-resume-facbol',
  templateUrl: './resume-facbol.component.html',
  styleUrls: ['./resume-facbol.component.scss']
})
export class ResumeFacbolComponent implements OnInit {

  @Output() isNewDocument = new EventEmitter<boolean>(false);
  @Output() isCalculateDocument = new EventEmitter<boolean>(false);
  formResumeFacBol! : FormGroup
  dataDetailSource = DataSourceDocumentDetail.getInstance()
  dataHeaderSource = DataSourceDocumentHeader.getInstance()
  isStatusInvoiceRegister = false
  currencies : Currency[] = []
  cursymbol: string | undefined = 'S/.'

  private buildForm(){
    this.formResumeFacBol = this.formBuilder.group({
      implistprice : [{value: 0.00.toFixed(2),disabled: true},[Validators.required]],
      impdesctotal : [{value: 0.00.toFixed(2),disabled: true},[Validators.required]],
      impsaleprice : [{value: 0.00.toFixed(2),disabled: true},[Validators.required]],
      imptribtotal : [{value: 0.00.toFixed(2),disabled: true},[Validators.required]],
      imptotal : [{value: 0.00.toFixed(2),disabled: true},[Validators.required]]
    })
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private globalStatusService: GlobalStatusService,
    private facbolGlobalStatusService: FacbolGlobalStatusService,
    private defaultValuesService: DefaultValuesService,
    private documentInvoiceService: DocumentInvoiceService
  ){
    this.buildForm()
    this.currencies = this.defaultValuesService.getLocalStorageValue('currencies')
  }
  ngOnInit(): void {
    this.facbolGlobalStatusService.isStatusInvoiceRegister$.subscribe({
        next:data =>{
          this.isStatusInvoiceRegister = data
        },
        error:error =>{this.isStatusInvoiceRegister = false}
      })
  }

  calculate() {
    if(this.isStatusInvoiceRegister){
      // Header
      this.globalStatusService.setLoading(true)
      this.isCalculateDocument.emit(true)
      const dataHeader = this.dataHeaderSource.get()
      this.cursymbol = this.currencies.find(currency => currency.codcur = dataHeader.codcur)?.symbol
      // Detail
      this.dataDetailSource.putReasignNumite()
      const dataDetail = this.dataDetailSource.getImp()
      this.implistprice?.setValue(dataDetail.implistprice?.toFixed(2));
      this.impdesctotal?.setValue(dataDetail.impdesctotal?.toFixed(2));
      this.impsaleprice?.setValue(dataDetail.impsaleprice?.toFixed(2));
      this.imptribtotal?.setValue(dataDetail.imptribtotal?.toFixed(2));
      this.imptotal?.setValue(dataDetail.imptotal?.toFixed(2));
      this.dataHeaderSource.updateImp(dataDetail)
      setTimeout(() => {
        this.isCalculateDocument.emit(false)
        this.globalStatusService.setLoading(false)
      }, 300);
    } else {
      this.facbolGlobalStatusService.setStatusInvoiceSave(false);
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_required_fields: 'Y' }
      })
    }
  }

  save() {
    if(this.isStatusInvoiceRegister){
      this.globalStatusService.setLoading(true)
      this.calculate()
      const documentInvoiceHeader = this.dataHeaderSource.get()
      if ((documentInvoiceHeader?.imptotal ?? 0) <= 0) {
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: { status: -3, message: 'El importe de Documento no puede ser menor o igual a CERO, con el motivo de VENTA' }
        })
        return
      }
      const documentInvoiceDetails = this.dataDetailSource.get().filter(data => data.numite > 0)
      this.documentInvoiceService.postRegisterDocument(documentInvoiceHeader, documentInvoiceDetails)
      .subscribe({
        next:data => {
          console.log(data)
          if(data.status<=0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          }
          if(data.status>=0){
            const dialogRef =  this.dialog.open(DialogQuestionComponent, {
              width: '400px',
              data: { status: 0, message: 'Do you want to print the document?'}
            })
            dialogRef.closed.subscribe(response =>{
              if(response){
                this.onPrint(data.object.numint)
              }
            })
            this.newDocument()
          }
        },
        error:err => {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        },
        complete: () => {
          this.globalStatusService.setLoading(false)
        }
      })
    } else {
      this.facbolGlobalStatusService.setStatusInvoiceSave(false);
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { status: -3, message: 'Documento incompleto!, revisar las validaciones del formulario' }
      })
    }
  }

  newDocument(){
    this.isNewDocument.emit(true)
    setTimeout(() => {
      this.isNewDocument.emit(false)
    }, 1000);
  }

  onPrint(numint: number){
    this.globalStatusService.setLoading(true)
    this.documentInvoiceService.getPrintDocument(numint)
    .subscribe({
      next:data =>{
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: { status:data.status, meesage:data.message }
          })
        }
        if (data.status>=0) {
          console.log(data.bytes)
          this.openArchive(data.bytes,data.format) // PDF ( BASE64 )
        }
        this.globalStatusService.setLoading(false)
      }
    })
  }

  openArchive(base64Data: string, format: string): void {
    const byteCharacters = atob(base64Data); // Decodificar el Base64 a bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const file = new Blob([byteArray], { type: 'application/pdf' }); // Crear un Blob con el contenido del PDF
    const fileURL = URL.createObjectURL(file);

    // Abrir una nueva pestaña en el navegador con el PDF
    window.open(fileURL, '_blank');
  }

  get implistprice (){
    return this.formResumeFacBol.get('implistprice')
  }
  get impdesctotal (){
    return this.formResumeFacBol.get('impdesctotal')
  }
  get impsaleprice (){
    return this.formResumeFacBol.get('impsaleprice')
  }
  get imptribtotal (){
    return this.formResumeFacBol.get('imptribtotal')
  }
  get imptotal (){
    return this.formResumeFacBol.get('imptotal')
  }

}
