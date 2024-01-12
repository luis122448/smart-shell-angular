import { Component, OnInit, Inject } from '@angular/core';
import { Currency } from 'src/app/auth/models/default-values.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPriceService } from '@billing-services/list-price.service';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { DatePipe } from '@angular/common';
import { BasicListPrice, ListPrice } from '@billing-models/list-price.model';


@Component({
  selector: 'app-basic-info-list-price',
  templateUrl: './basic-info-list-price.component.html',
  styleUrls: ['./basic-info-list-price.component.scss']
})
export class BasicInfoListPriceComponent implements OnInit {

  formCrudListPrice!: FormGroup
  id : number = 0
  validListPrice = false
  currencies: Currency[] = []

  private buildForm(){
    this.formCrudListPrice = this.formBuilder.group({
      codlistprice: ['',[Validators.required]],
      abrevi: ['',[Validators.required]],
      descri: ['',[Validators.required]],
      codext: ['',[]],
      codcur: ['',[Validators.required]],
      inctax : [false,[Validators.required]],
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
    private listPriceService: ListPriceService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    @Inject(DIALOG_DATA) data : ListPrice | null,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ){
    this.buildForm()
    if(data) {
      this.formCrudListPrice.patchValue({
        codlistprice : data.codlistprice,
        abrevi : data.abrevi,
        descri : data.descri,
        codext : data.codext,
        codcur : data.codcur,
        inctax : data.inctax === 'Y' ? true : false,
        observ : data.observ,
        commen : data.commen,
        status : data.status,
        createby : data.createby,
        updateby : data.updateby,
        createat : data.createat,
        updateat : data.updateat,
      })
      this.validListPrice =  true
    }
  }
  ngOnInit(): void {
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
    if(!this.validListPrice && this.id){
      this.globalStatusService.setLoading(true)
      this.listPriceService.getById(this.id)
      .subscribe({
        next:data =>{
          if(data.object){
            this.formCrudListPrice.patchValue({
              codlistprice : data.object.codlistprice,
              abrevi : data.object.abrevi,
              descri : data.object.descri,
              codext : data.object.codext,
              codcur : data.object.codcur,
              inctax : data.object.inctax === 'Y' ? true : false,
              observ : data.object.observ,
              commen : data.object.commen,
              status : data.object.status,
              createby : data.object.createby,
              updateby : data.object.updateby,
              createat : data.object.createat,
              updateat : data.object.updateat,
            })
          }
          this.globalStatusService.setLoading(false)
        },
      error:error =>{
        console.log(error.message)
        this.globalStatusService.setLoading(false)
      }
      })
    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudListPrice.get(fieldName)
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

  saveListPrice(){
    if(this.formCrudListPrice.valid){
      this.formCrudListPrice.value.inctax = this.formCrudListPrice.value.inctax === true ? 'Y' : 'N'
      this.listPriceService.postSave(this.formCrudListPrice.value)
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
      this.formCrudListPrice.markAllAsTouched()
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }


  get status() {
    return this.formCrudListPrice.get('status')
  }
  get createby() {
    return this.formCrudListPrice.get('createby')
  }
  get updateby() {
    return this.formCrudListPrice.get('updateby')
  }
  get createat() {
    return this.formCrudListPrice.get('createat')
  }
  get updateat() {
    return this.formCrudListPrice.get('updateat')
  }
}
