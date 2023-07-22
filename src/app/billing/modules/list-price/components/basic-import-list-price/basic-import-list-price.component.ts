import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { BasicListPrice, ListPrice } from '@billing-models/list-price.model';
import { ListPriceService } from '@billing-services/list-price.service';

@Component({
  selector: 'app-basic-import-list-price',
  templateUrl: './basic-import-list-price.component.html',
  styleUrls: ['./basic-import-list-price.component.scss']
})
export class BasicImportListPriceComponent {

  formCrudListPriceArticle!: FormGroup
  id : number = 0
  listPrice : ListPrice | null = null
  validListPrice = false

  private buildForm(){
    this.formCrudListPriceArticle = this.formBuilder.group({
      codlistprice: [{value:'',disabled: true},[Validators.required]]
    })
  }

  constructor(
    private listPriceService: ListPriceService,
    private listPriceArticleService: ListPriceArticleService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) data : BasicListPrice,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ){
    this.id = data.codlistprice
    this.buildForm()
    if(data.listprice) {
      this.formCrudListPriceArticle.patchValue({
        codlistprice : data.listprice.codlistprice
      })
      this.listPrice = data.listprice
      this.validListPrice =  true
    }
    // this.codlistprice?.disable()
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudListPriceArticle.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  importListPriceArticle(){

  }

  exportListPriceArticle(){

  }

  closeDialog(){
    this.dialogRef.close()
  }

  get codlistprice(){
    return this.formCrudListPriceArticle.get('codlistprice')
  }
}
