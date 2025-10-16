import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { ListPrice } from '@billing-models/list-price.model';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { downloadFile } from '@billing-utils/function';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';

interface DialogData {
  listPrice: ListPrice,
  isNewListPrice: boolean
}

@Component({
  selector: 'app-basic-import-list-price',
  templateUrl: './basic-import-list-price.component.html',
  styleUrls: ['./basic-import-list-price.component.scss']
})
export class BasicImportListPriceComponent {

  formCrudListPriceArticle!: FormGroup
  listPrices : ListPrice[] = []
  validListPrice = false

  private buildForm(codeListPrice: number = 0, disabled: boolean = false){
    this.formCrudListPriceArticle = this.formBuilder.group({
      codlistprice: [{value:codeListPrice,disabled: disabled},[Validators.required]],
      file: ['', [Validators.required]]
    })
  }

  constructor(
    private listPriceArticleService: ListPriceArticleService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) data : DialogData,
    private defaultValuesService: DefaultValuesService
  ){
    if(!data.isNewListPrice && data.listPrice){
      this.listPrices.push(data.listPrice)
      this.buildForm(data.listPrice.codlistprice,true)
    } else {
      this.listPrices = this.defaultValuesService.getLocalStorageValue('listPrices')
      const defaultListPrice = this.listPrices.find(data => data.defaul === 'Y');
      this.buildForm(defaultListPrice?.codlistprice,false)
    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudListPriceArticle.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  clearArchive() {
    const fileInput = document.getElementById('file_input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.file?.setValue("")
  }

  selectArchive(event: any){
    if(event?.target){
      const data:File = event.target.files[0]
      this.file?.setValue(data)
    }
  }

  importListPriceArticle(){
    if (this.formCrudListPriceArticle.invalid) {
      this.formCrudListPriceArticle.markAllAsTouched()
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_file_selected: 'S' }
      })
      return
    }
    this.listPriceArticleService.postByImport(this.codlistprice?.value, this.file?.value).subscribe({
      next: data => {
        if(data.status<=0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else {
          this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent, MatSnackBarSuccessConfig);
        }
        const fileName = `${data.name}.${data.extension}`
        downloadFile(data, fileName)
        this.clearArchive()
      }
    })
  }

  exportListPriceArticle(){
    this.listPriceArticleService.getByExport(this.codlistprice?.value).subscribe({
      next: data => {
        if(data.status<=0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else{
          const fileName = `${data.name}.${data.extension}`;
          downloadFile(data, fileName);
        }
      }
    })
  }

  generateListPriceArticle(){
    this.listPriceArticleService.getByGenerate(this.codlistprice?.value).subscribe({
      next: data => {
        if(data.status<=0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        } else{
          const fileName = `${data.name}.${data.extension}`;
          downloadFile(data, fileName);
        }
      },
      error: err => {
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: err.error
        })
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

  get codlistprice(){
    return this.formCrudListPriceArticle.get('codlistprice')
  }
  get file(){
    return this.formCrudListPriceArticle.get('file')
  }
}
