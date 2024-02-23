import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Article } from '../../models/article.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../services/article.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { Data } from '@angular/router';

export interface DialogData {
  codart?: string
  descri?: string
  codlistprice: number
}

@Component({
  selector: 'app-dialog-get-article',
  templateUrl: './dialog-get-article.component.html',
  styleUrls: ['./dialog-get-article.component.scss']
})
export class DialogGetArticleComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass
  dataSource = new DataSourceArticle();
  displayedColumns: string[] = ['codart', 'descri','codext'];
  input =  new FormControl('',{ nonNullable: true })
  countRecords = 0;

  constructor(
    private dialogRef: DialogRef,
    private dialog: Dialog,
    private articleService: ArticleService,
    private listPriceArticleService:ListPriceArticleService,
    private globalStatusService: GlobalStatusService,
    @Inject(DIALOG_DATA) private data: DialogData
  ){}

  ngOnInit(): void {
    this.loadArticle(this.data.codart,this.data.descri)
    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(data =>{
      this.dataSource.getFind(data)
    })
  }

  loadArticle(codart: string | undefined, descri: string | undefined){
    this.globalStatusService.setLoading(true)
    if(codart){
      this.articleService.getArticleCodart(codart)
      .subscribe({
        next: data =>{
          this.dataSource.getInit(data.list)
          this.countRecords = this.dataSource.getCount()
          if (data.list.length == 1){
            this.closeDialog(data.list[0])
          }
        },
        error: err =>{
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error
          })
          this.closeDialog(null)
        },
        complete: () => this.globalStatusService.setLoading(false)
      })
    } else if (descri){
      this.articleService.getArticleDescri(descri)
      .subscribe({
        next: data =>{
          this.dataSource.getInit(data.list)
          this.countRecords = this.dataSource.getCount()
          if (data.list.length == 1){
            this.closeDialog(data.list[0])
          }
        },
        error: err =>{
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error
          })
          this.closeDialog(null)
        },
        complete: () => this.globalStatusService.setLoading(false)
      })
    } else {
      this.globalStatusService.setLoading(false)
    }
  }

  closeDialog(row: Article | null){
    if(row){
      this.globalStatusService.setLoading(true)
      this.listPriceArticleService.getById(this.data.codlistprice,row.codart)
      .subscribe({
        next: data =>{
          if(data.object){
            row.desinv = 'MERC'
            row.price = data.object.price
            row.stock = 0
            row.moddesc = data.object.moddesc
            row.modprice = data.object.modprice
          } else {
            row.desinv = 'UND'
            row.price = 0
            row.stock = 0
            row.moddesc = 'Y'
            row.modprice = 'Y'
          }
        },
        error: err =>{
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
        },
        complete: () => {
          this.globalStatusService.setLoading(false)
          this.dialogRef.close(row)
        }
      })
    } else {
      this.dialogRef.close(null);
    }
  }
}

export class DataSourceArticle extends DataSource<Article>{

  data = new BehaviorSubject<Article[]>([])
  originalData = new BehaviorSubject<Article[]>([])

  connect(): Observable<Article[]>{
    return this.data
  }

  disconnect() {

  }

  getInit(data: Article[]){
    this.data.next(data);
    this.originalData.next(data);
  }

  getFind(query: string){
    const data = this.originalData.getValue()
    const newData = data.filter(data =>{
      const word = `${data.codart}${data.codext}${data.descri}`
      return word.toLowerCase().includes(query.toLowerCase())
    })
    this.data.next(newData)
  }

  getCount(){
    const data = this.data.getValue()
    return data.reduce((count, data) => count = count + 1, 0) - 1
  }

}
