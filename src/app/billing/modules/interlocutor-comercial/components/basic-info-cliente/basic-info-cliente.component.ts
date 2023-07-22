import { Component, Inject, OnInit } from '@angular/core';
import { BusinessPartnerService } from '@billing-services/interlocutor-comcercial.service';
import { Form, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterlocutorComercialBasic } from '@billing-models/interlocutor-comercial.model';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { IMAGENOUPLOAD, MatSnackBarSuccessConfig, NoDataFoundMessageDialog, NoJpgFormatImage } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-basic-info-cliente',
  templateUrl: './basic-info-cliente.component.html',
  styleUrls: ['./basic-info-cliente.component.scss']
})
export class BasicInfoClienteComponent implements OnInit {

  formCrudCliente!: FormGroup
  urlLink: string = ''
  codbusparId: string = ''
  existeCliente = false
  imageInterlocutorComercialURL = IMAGENOUPLOAD

  private buildForm(){
    this.formCrudCliente = this.formBuilder.group({
      codbuspar: ['',[Validators.required, Validators.minLength(5),Validators.pattern(/^\S*$/)]],
      typbuspar: ['',[Validators.required]],
      typidedoc: ['',[Validators.required]],
      nroidedoc: ['',[Validators.required]],
      codext: ['',[]],
      busnam: ['',[Validators.required]],
      apepat: ['',[]],
      apemat: ['',[]],
      nombre: ['',[]],
      registdate: ['',[]],
      poscod: ['',[Validators.required]],
      addres: ['',[Validators.required]],
      codtel: ['',[]],
      telefo: ['',[]],
      email: ['',[]],
      typpaycon: ['',[]],
      limcre: ['',[]],
      lispre: ['',[]],
      image: ['',[]],
      observ: ['',[]],
      commen: ['',[]],
      status: ['',[]],
      createby: [{value:'',disabled: true},[]],
      updateby: [{value:'',disabled: true},[]],
      createat: [{value:'',disabled: true},[]],
      updateat: [{value:'',disabled: true},[]],
    })
  }
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private businessPartnerService: BusinessPartnerService,
    private globalStatusService: GlobalStatusService,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) private data: InterlocutorComercialBasic
    ){
    this.codbusparId = this.data.codbuspar
    this.buildForm()
  }
  ngOnInit(): void {
    if (this.codbusparId) {
      this.globalStatusService.setLoading(true)
      this.businessPartnerService.getById(this.codbusparId)
      .subscribe({
        next:data => {
          // console.log(data)
          if (data.status<= 0) {
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: {status: data.status, message: data.message}
            })
          } else {
            if (!data.object || Object.keys(data.object).length === 0) {
              this.dialog.open(DialogErrorAlertComponent,NoDataFoundMessageDialog)
            } else {
              this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
              this.formCrudCliente.patchValue({
                codbuspar: data.object.codbuspar,
                typbuspar: data.object.typbuspar,
                typidedoc: data.object.typidedoc,
                nroidedoc: data.object.nroidedoc,
                codext: data.object.codext,
                busnam: data.object.busnam,
                apepat: data.object.apepat,
                apemat: data.object.apemat,
                nombre: data.object.nombre,
                registdate: data.object.registdate,
                poscod: data.object.poscod,
                addres: data.object.addres,
                codtel: data.object.codtel,
                telefo: data.object.telefo,
                email: data.object.email,
                typpaycon: data.object.typpaycon,
                limcre: data.object.limcre,
                lispre: data.object.lispre,
                image: data.object.image,
                observ: data.object.observ,
                commen: data.object.commen,
                status: data.object.status,
                createby: data.object.createby,
                updateby: data.object.updateby,
                createat: data.object.createat,
                updateat: data.object.updateat,
              })
              // Verificar si hay imagen para mostrar
              // console.log(data.object.image)
              if (data.object.image){
                // const blob = new Blob([data.object.image], { type: 'image/jpeg' });
                // this.imageInterlocutorComercialURL = URL.createObjectURL(blob);
                // const imageBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data.object.image)));
                const imageUrl = `data:image/jpeg;base64,${data.object.image}`
                this.imageInterlocutorComercialURL = imageUrl;
              }
            }
          }
          this.globalStatusService.setLoading(false)
        },
        error:error =>{
          console.log(error)
        }
      })
      this.existeCliente = true
    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudCliente.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  saveInterlocutorComercial(){
    if (this.formCrudCliente.valid) {
      this.globalStatusService.setLoading(true)
      if (!this.existeCliente) {
        // console.log(this.formCrudCliente.value)
        this.businessPartnerService.postSave(this.formCrudCliente.value)
        .subscribe({
          next:data =>{
            console.log(data)
            if (data.status<=0) {
              this.dialog.open(DialogErrorAlertComponent,{
                width: '400px',
                data: {status: data.status, message: data.message}
              })
            } else {
              this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            }
            this.globalStatusService.setLoading(false)
          },
          error:error =>{
            console.log(error)
            this.globalStatusService.setLoading(false)
          }
        })
      } else {
        this.businessPartnerService.putUpdate(this.codbuspar?.value,this.formCrudCliente.value)
        .subscribe({
          next:data =>{
            console.log(data)
            if (data.status<=0) {
              this.dialog.open(DialogErrorAlertComponent,{
                width: '400px',
                data: {status: data.status, message: data.message}
              })
            } else {
              this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            }
            this.globalStatusService.setLoading(false)
          },
          error:error =>{
            console.log(error)
            this.globalStatusService.setLoading(false)
          }
        })
      }
      this.dialogRef.close()
    } else {
      this.formCrudCliente.markAllAsTouched()
    }
  }

  onImageSelected(event: any){

    if(event?.target){
      const data:File = event?.target.files[0]

      if (data) {
        // Validando Extencion del Archivo
        const extension = data.name.split('.').pop()?.toLowerCase()
        if (extension === 'jpg') {
          const reader = new FileReader()
          reader.onload = (e: any) => {
            const fileContent: ArrayBuffer = e.target.result
            this.imageInterlocutorComercialURL = URL.createObjectURL(data)
            // this.image?.setValue(fileContent)
            this.image?.setValue(Array.from(new Uint8Array(fileContent)))
          }
          reader.readAsArrayBuffer(data)
        } else {
          event.target.value = null
          this.imageInterlocutorComercialURL = IMAGENOUPLOAD
          this.dialog.open(DialogErrorAlertComponent,NoJpgFormatImage)
        }
      }
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

  formatDate(date: number[]): String {
    const aux : Date = MyDate.convertToCustomDate(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())){
      return this.datePipe.transform(aux,'HH:mm - dd/MM/yy') || ''
    }
    return ''
  }

  isDateValid(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  get codbuspar() {
    return this.formCrudCliente.get('codbuspar')
  }
  get typbuspar() {
    return this.formCrudCliente.get('typbuspar')
  }
  get typidedoc() {
    return this.formCrudCliente.get('typidedoc')
  }
  get codext() {
    return this.formCrudCliente.get('codext')
  }
  get busnam() {
    return this.formCrudCliente.get('busnam')
  }
  get apepat() {
    return this.formCrudCliente.get('apepat')
  }
  get apemat() {
    return this.formCrudCliente.get('apemat')
  }
  get nombre() {
    return this.formCrudCliente.get('nombre')
  }
  get registdate() {
    return this.formCrudCliente.get('registdate')
  }
  get poscod() {
    return this.formCrudCliente.get('poscod')
  }
  get addres() {
    return this.formCrudCliente.get('addres')
  }
  get codtel() {
    return this.formCrudCliente.get('codtel')
  }
  get telefo() {
    return this.formCrudCliente.get('telefo')
  }
  get email() {
    return this.formCrudCliente.get('email')
  }
  get typpaycon() {
    return this.formCrudCliente.get('typpaycon')
  }
  get limcre() {
    return this.formCrudCliente.get('limcre')
  }
  get lispre() {
    return this.formCrudCliente.get('lispre')
  }
  get image() {
    return this.formCrudCliente.get('image')
  }
  get observ() {
    return this.formCrudCliente.get('observ')
  }
  get commen() {
    return this.formCrudCliente.get('commen')
  }
  get status() {
    return this.formCrudCliente.get('status')
  }
  get createby() {
    return this.formCrudCliente.get('createby')
  }
  get updateby() {
    return this.formCrudCliente.get('updateby')
  }
  get createat() {
    return this.formCrudCliente.get('createat')
  }
  get updateat() {
    return this.formCrudCliente.get('updateat')
  }
}
