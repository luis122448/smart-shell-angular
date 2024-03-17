import { DataSource } from '@angular/cdk/collections';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleAttached } from '@billing-models/article-attached.model';
import { ArticleSpecification } from '@billing-models/article-specification.model';
import { ArticleBasic } from '@billing-models/article.model';
import { ArticleAttachedService } from '@billing-services/article-attached.service';
import { ArticleSpecificationService } from '@billing-services/article-specification.service';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { MatSnackBarSuccessConfig, NoDataFoundMessageDialog } from '@billing-utils/constants';
import { MyDate } from '@billing-utils/date';
import { downloadFile } from '@billing-utils/function';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-basic-article-attached',
  templateUrl: './basic-article-attached.component.html',
  styleUrls: ['./basic-article-attached.component.scss']
})
export class BasicArticleAttachedComponent {

  basicArticle! : ArticleBasic
  formArticleAttached! : FormGroup
  dataSourceArticleAttached = new DataSourceArticleAttached()
  displayedColumns: string[] = ['destypspe','archive','updateby','updateat','operac']
  optionArticleSpecification : ArticleSpecification[] = []
  articleSpecificationSelected : ArticleSpecification | null = null

  buildForm(codart: string = ''){
    this.formArticleAttached = this.formBuilder.group({
      codart: [codart,[Validators.required]],
      typspe: ['',[Validators.required]],
      observ: ['',[]],
      file: ['',[Validators.required]]
    })
  }

  constructor(
    private datePipe: DatePipe,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder,
    private articleAttachedService: ArticleAttachedService,
    private articleSpecificationService: ArticleSpecificationService,
    private globalStatusService: GlobalStatusService,
    private matSnackBar: MatSnackBar,
    @Inject(DIALOG_DATA) data : ArticleBasic
  ){
    this.buildForm(data.codart)
    this.basicArticle = data
  }

  ngOnInit(): void {
    if(this.basicArticle.typinv){
      this.globalStatusService.setLoading(true)
      this.articleSpecificationService.getByAll(this.basicArticle.typinv).subscribe({
        next:data =>{
          if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          }
          this.optionArticleSpecification = data.list
          this.dataSourceArticleAttached.getInitSpecification(data.list)
        },
        error:err =>{
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
          this.globalStatusService.setLoading(false)
        },
        complete:() => {
          this.globalStatusService.setLoading(false)
        }
      })
    }
    if(this.basicArticle.codart){
      this.searchArticleAttached(this.basicArticle.codart)
    }
  }

  searchArticleAttached(codart: string){
    this.globalStatusService.setLoading(true)
    this.articleAttachedService.getByAll(codart).subscribe({
      next:data =>{
        if(data.status <= 0){
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        }
        this.dataSourceArticleAttached.getInit(data.list)
      },
      error:err =>{
        this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        this.globalStatusService.setLoading(false)
      },
      complete:() => {
        this.globalStatusService.setLoading(false)
      }
    })
  }

  clearArchive() {
    const fileInput = document.getElementById('file_input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.file?.setValue("")
  }

  selectArchive(event: any){
    if(this.formArticleAttached.invalid){
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_required_fields: 'Y'}
      })
      this.formArticleAttached.markAllAsTouched()
      return
    }
    if(event?.target){
      const files :File[] = event.target.files
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          // Verifica si el archivo es una imagen antes de mostrar la miniatura
          if (file.type.startsWith('image/')) {
            this.showThumbnail(file);
          }
        }
      }
      this.file?.setValue(files)
    }
  }

  onTypspeSelectionChange(typspe: number){
    this.articleSpecificationSelected = this.optionArticleSpecification.find(option => option.typspe == typspe) || null
  }

  addArticleAttached(){
    if(this.formArticleAttached.invalid){
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_required_fields: 'Y'}
      })
      this.formArticleAttached.markAllAsTouched()
      return
    }
    this.globalStatusService.setLoading(true)
    const articleAttached: ArticleAttached = {
      codart: this.codart?.value,
      typspe: this.typspe?.value,
      observ: this.observ?.value,
      archive: '',
      idMongo: ''
    }
    this.articleAttachedService.postSave(articleAttached, [], this.file?.value)
    .subscribe({
      next:data =>{
        if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          } else {
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            this.searchArticleAttached(articleAttached.codart)
        }
        this.globalStatusService.setLoading(false)
      },
      error:err =>{
        this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        this.globalStatusService.setLoading(false)
      }
    })
    this.clearArchive()
  }

  downloadArticleAttached(row: ArticleAttached){
    this.globalStatusService.setLoading(true)
    this.articleAttachedService.findByDownloader(row.codart,row.typspe).subscribe({
      next:data =>{
        if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          } else {
            const fileName = `${data.name}.${data.extension}`;
            downloadFile(data, fileName);
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
        }
        this.globalStatusService.setLoading(false)
  },
      error:err =>{
        this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        this.globalStatusService.setLoading(false)
      }
    })
  }

  deleteArticleAttached(row: ArticleAttached){
    this.globalStatusService.setLoading(true)
    this.articleAttachedService.delDelete(row.codart,row.typspe)
    .subscribe({
      next:data =>{
        if(data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: data
            })
          } else {
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            this.searchArticleAttached(row.codart)
        }
        this.globalStatusService.setLoading(false)
      },
      error:err =>{
        this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        this.globalStatusService.setLoading(false)
      }
    })
  }

  showThumbnail(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'file-thumbnail';
        thumbnail.innerHTML = `
          <img src="${event.target.result}" alt="${file.name}" />
          <p>${file.name}</p>
        `;
        document.querySelector('.file-thumbnails')?.appendChild(thumbnail);
      };
      reader.readAsDataURL(file);
    }
  }


  get codart(){
    return this.formArticleAttached.get('codart')
  }
  get typspe(){
    return this.formArticleAttached.get('typspe')
  }
  get observ(){
    return this.formArticleAttached.get('observ')
  }
  get file(){
    return this.formArticleAttached.get('file')
  }

  formatDate(date: number[]): String {
    const aux : Date = MyDate.convertToCustomDate(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())){
      return this.datePipe.transform(aux,'HH:mm - dd/MM/yy') || ''
    }
    return ''
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formArticleAttached.get(fieldName)
    return field ? field.invalid && field.touched : true
  }


  closeDialog(){
    this.dialogRef.close()
  }

}

export class DataSourceArticleAttached extends DataSource<ArticleAttached>{

  data = new BehaviorSubject<ArticleAttached[]>([])
  articleSpecification = new BehaviorSubject<ArticleSpecification[]>([])

  connect(): Observable<ArticleAttached[]> {
    return this.data
  }

  disconnect(){}

  getInitSpecification(data: ArticleSpecification[]){
    this.articleSpecification.next(data)
  }

  getInit(data: ArticleAttached[]){
    this.data.next(data.map((row: ArticleAttached) => {
      return {
        ...row,
        destypspe: this.articleSpecification.getValue().find(option => option.typspe == row.typspe)?.descri || '',
      }
    }))
  }

  getPush(data: ArticleAttached) {
    const newData = [...this.data.value, data];
    this.data.next(newData);
  }

  getClean(codart: string, typspe: number){
    const data = this.data.getValue()
    const newData = data.filter(data => (data.typspe == typspe && data.codart == codart) ? false : true)
    this.data.next(newData)
  }
}
