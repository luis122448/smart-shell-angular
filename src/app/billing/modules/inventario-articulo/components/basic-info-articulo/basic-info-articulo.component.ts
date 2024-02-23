import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component,OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleBasic } from '@billing-models/article.model';
import { ArticleService } from '@billing-services/article.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { IMAGENOUPLOAD, MatSnackBarSuccessConfig, NoJpgFormatImage } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { Inventory } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { DatePipe } from '@angular/common';
import { MyValidators } from '@billing-utils/validator';

@Component({
  selector: 'app-basic-info-articulo',
  templateUrl: './basic-info-articulo.component.html',
  styleUrls: ['./basic-info-articulo.component.scss']
})

export class BasicInfoArticleComponent implements OnInit {

  formCrudArticle!: FormGroup
  urlLink: string = ''
  codartId: string = ''
  validArticle = false
  imageArticleURL = IMAGENOUPLOAD
  noImage = true
  inventories: Inventory[] = []

  private buildForm(){
    this.formCrudArticle = this.formBuilder.group({
      codart: ['',[Validators.required], MyValidators.AvailableCodartArticle(this.articuloService)],
      typinv: ['',[Validators.required]],
      abrevi: ['',[Validators.required]],
      descri: ['',[Validators.required]],
      codext: ['',[]],
      codbar: ['',[]],
      codean: ['',[]],
      registdate: ['',[]],
      cstock: ['',[Validators.required]],
      codprv: ['',[]],
      codman: ['',[]],
      coduni: ['',[Validators.required]],
      stocknegative : [false,[]],
      editdescri : [false,[]],
      printcomment : [false,[]],
      image: ['',[]],
      observ: ['',[]],
      commen: ['',[]],
      status: ['',[]],
      createby: ['',[]],
      updateby: ['',[]],
      createat: ['',[]],
      updateat: ['',[]],
    })
  }

  constructor(
    private articuloService: ArticleService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    @Inject(DIALOG_DATA) data : ArticleBasic,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ){
    this.buildForm()
    this.codartId = data.codart
    if(data.row) {
      this.formCrudArticle.setValue(data.row)
      this.formCrudArticle.patchValue({
        codart: data.row.codart,
        typinv: data.row.typinv,
        abrevi: data.row.abrevi,
        descri: data.row.descri,
        codext: data.row.codext,
        codbar: data.row.codbar,
        codean: data.row.codean,
        registdate: data.row.registdate,
        cstock: data.row.cstock,
        codprv: data.row.codprv,
        codman: data.row.codman,
        coduni: data.row.coduni,
        stocknegative: data.row.stocknegative === 'Y' ? true : false,
        editdescri: data.row.editdescri === 'Y' ? true : false,
        printcomment: data.row.printcomment === 'Y' ? true : false,
        image: data.row.image,
        observ: data.row.observ,
        commen: data.row.commen
      })
      this.codart?.disable()
      this.validArticle =  true
    }
  }
  ngOnInit(): void {
    this.inventories = this.defaultValuesService.getCookieValue('inventories')
    if (!this.validArticle) {
      this.globalStatusService.setLoading(true)
      this.articuloService.getById(this.codartId)
      .subscribe({
        next:data =>{
          if (data.status<=0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: { status: data.status, message: data.message }
            })
          } else {
            if (!data.object) {
            } else {
              this.formCrudArticle.patchValue({
                codart: data.object.codart,
                typinv: data.object.typinv,
                abrevi: data.object.abrevi,
                descri: data.object.descri,
                codext: data.object.codext,
                codbar: data.object.codbar,
                codean: data.object.codean,
                registdate: this.returnDate(data.object.registdate).toISOString().substring(0, 10),
                cstock: data.object.cstock,
                codprv: data.object.codprv,
                codman: data.object.codman,
                coduni: data.object.coduni,
                stocknegative: data.object.stocknegative === 'Y' ? true : false,
                editdescri: data.object.editdescri === 'Y' ? true : false,
                printcomment: data.object.printcomment === 'Y' ? true : false,
                image: data.object.image,
                observ: data.object.observ,
                commen: data.object.commen
              })
              this.codart?.disable()
              this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            }
          }
          this.globalStatusService.setLoading(false)
        },
        error:data =>{

        }
      })
    } else {

    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudArticle.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  formatDate(date: number[]): String {
    const aux : Date = MyDate.convertToCustomDateShort(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())){
      return this.datePipe.transform(aux,'dd/MM/yy') || ''
    }
    return ''
  }

  returnDate(date: number[] | Date): Date {
    if (date instanceof Date) {
      return date
    }
    const aux : Date = MyDate.convertToCustomDateShort(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    return aux
  }

  saveArticle(){
    if(this.formCrudArticle.valid){
      this.formCrudArticle.value.stocknegative = this.formCrudArticle.value.stocknegative === true ? 'Y' : 'N'
      this.formCrudArticle.value.editdescri = this.formCrudArticle.value.editdescri === true ? 'Y' : 'N'
      this.formCrudArticle.value.printcomment = this.formCrudArticle.value.printcomment === true ? 'Y' : 'N'
      this.articuloService.postSave(this.formCrudArticle.value)
      .subscribe({
        next:data =>{
          if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { status:data.status, message:data.message }
            })
          }
          if(data.status >= 0){
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            this.dialogRef.close()
          }
        }
      })
    } else {
      if(this.codart?.hasError('not_available')){
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: { status:0, message:'The article code is already registered' }
        })
      }
      this.formCrudArticle.markAllAsTouched()
    }
  }

  selectedImage(event: any){
    if(event?.target){
      const data:File = event.target.files[0]
      if (data) {
        const format =  data.name.split('.').pop()?.toLowerCase()
        if (format === 'jpg') {
          const reader = new FileReader()
          reader.onload = (e: any) => {
            try {
              const fileContent: ArrayBuffer = e.target.result;
              this.imageArticleURL = URL.createObjectURL(data);
              this.image?.setValue(Array.from(new Uint8Array(fileContent)));
            } catch (error) {
              console.error('Error during file loading:', error);
            }
          };
          reader.readAsArrayBuffer(data);
          this.noImage = false
        } else {
          event.target.value = null
          this.imageArticleURL = IMAGENOUPLOAD
          this.noImage = true
          this.dialog.open(DialogErrorAlertComponent,NoJpgFormatImage)
        }
      }
    }
  }

  resetImage() {
    this.image?.setValue(null);
    this.imageArticleURL = ''; // Restablecer la URL de la imagen
    this.noImage = true;
  }

  closeDialog(){
    this.dialogRef.close()
  }

  get codart() {
    return this.formCrudArticle.get('codart')
  }
  get typinv() {
    return this.formCrudArticle.get('typinv')
  }
  get abrevi() {
    return this.formCrudArticle.get('abrevi')
  }
  get descri() {
    return this.formCrudArticle.get('descri')
  }
  get codext() {
    return this.formCrudArticle.get('codext')
  }
  get codbar() {
    return this.formCrudArticle.get('codbar')
  }
  get registdate() {
    return this.formCrudArticle.get('registdate')
  }
  get cstock() {
    return this.formCrudArticle.get('cstock')
  }
  get codprv() {
    return this.formCrudArticle.get('codprv')
  }
  get codman() {
    return this.formCrudArticle.get('codman')
  }
  get codund() {
    return this.formCrudArticle.get('codund')
  }
  get image() {
    return this.formCrudArticle.get('image')
  }
  get observ() {
    return this.formCrudArticle.get('observ')
  }
  get commen() {
    return this.formCrudArticle.get('commen')
  }
  get status() {
    return this.formCrudArticle.get('status')
  }
  get createby() {
    return this.formCrudArticle.get('createby')
  }
  get updateby() {
    return this.formCrudArticle.get('updateby')
  }
  get createat() {
    return this.formCrudArticle.get('createat')
  }
  get updateat() {
    return this.formCrudArticle.get('updateat')
  }

}
