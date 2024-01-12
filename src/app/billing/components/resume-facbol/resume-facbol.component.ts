import { Component, Inject, OnInit } from '@angular/core';
import { DataSourceDocumentHeader, DataSourceDocumentDetail } from '../../data/datasource-facbol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacbolGlobalStatusService } from '../../services/facbol-global-status.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { FacbolOperacService } from '../../services/facbol-operac.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Currency } from 'src/app/auth/models/default-values.model';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DialogQuestionComponent } from '@shared/components/dialog-question/dialog-question.component';
import { APIErrorMessage } from '@shared/model/mensaje.model';

@Component({
  selector: 'app-resume-facbol',
  templateUrl: './resume-facbol.component.html',
  styleUrls: ['./resume-facbol.component.scss']
})
export class ResumeFacbolComponent implements OnInit {

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
    this.currencies = this.defaultValuesService.currencies
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
      const dataHeader = this.dataHeaderSource.get()
      this.cursymbol = this.currencies.find(currency => currency.symbol = dataHeader.codcur)?.symbol
      // Detail
      const dataDetail = this.dataDetailSource.getImp()
      console.log(dataDetail);
      // this.impafecto?.setValue(dataDetail.impafecto);
      // this.impinafecto?.setValue(dataDetail.impinafecto);
      // this.impexonerado?.setValue(dataDetail.impexonerado);
      // this.impgratuito?.setValue(dataDetail.impgratuito);
      // this.impigv?.setValue(dataDetail.impigv);
      // this.impisc?.setValue(dataDetail.impisc);

      this.impdesctotal?.setValue(dataDetail.impdesctotal);
      this.impsaleprice?.setValue(dataDetail.impsaleprice);
      this.imptotal?.setValue(dataDetail.imptotal);
      this.dataHeaderSource.updateImp(dataDetail)
    } else {
      this.facbolGlobalStatusService.setStatusInvoiceSave(false);
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { status: -3, message: 'Documento incompleto!, revisar las validaciones del formulario' }
      })
    }
  }

  save() {
    if(this.isStatusInvoiceRegister){
      const documentInvoiceHeader = this.dataHeaderSource.get()
      if ((documentInvoiceHeader?.imptotal ?? 0) <= 0) {
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: { status: -3, message: 'El importe de Documento no puede ser menor o igual a CERO, con el motivo de VENTA' }
        })
        return
      }
      const documentInvoiceDetails = this.dataDetailSource.get().filter(data => data.numite > 0)
      this.globalStatusService.setLoading(true)
      this.documentInvoiceService.postRegisterDocument(documentInvoiceHeader, documentInvoiceDetails)
      .subscribe({
        next:data => {
          console.log(data)
          if(data.status<=0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { status: data.status, message: data.message }
            })
          }
          if(data.status>=0){
            const dialogRef =  this.dialog.open(DialogQuestionComponent, {
              width: '400px',
              data: { status: 0, message: 'Do you want to print the document?'}
            })
            dialogRef.closed.subscribe(response =>{
              console.log(response)
              console.log(data)
              if(response){
                this.onPrint(data.object.numint)
              }
            })
          }
          this.globalStatusService.setLoading(false)
        },
        error:error => {
          error.error.text().then((data:APIErrorMessage ) => {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: { status: -3, message: data.message }
            })
          })
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

  // get impafecto (){
  //   return this.formResumeFacBol.get('impafecto')
  // }
  // get impinafecto (){
  //   return this.formResumeFacBol.get('impinafecto')
  // }
  // get impexonerado (){
  //   return this.formResumeFacBol.get('impexonerado')
  // }
  // get impgratuito (){
  //   return this.formResumeFacBol.get('impgratuito')
  // }
  // get impigv (){
  //   return this.formResumeFacBol.get('impigv')
  // }
  // get impisc (){
  //   return this.formResumeFacBol.get('impisc')
  // }
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
