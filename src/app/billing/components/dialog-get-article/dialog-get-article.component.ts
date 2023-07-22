import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Article } from '../../models/article.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../services/article.service';
import { GlobalStatusService } from '../../services/global-status.service';

export interface DialogData {
  codart: string
  descri: string
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
    private articleService: ArticleService,
    private globalStatusService: GlobalStatusService,
    @Inject(DIALOG_DATA) private data: DialogData
  ){}
  ngOnInit(): void {
    if(this.data.codart){
      this.globalStatusService.setLoading(true)
      this.articleService.getArticleCodart(this.data.codart)
      .subscribe(data =>{
        this.dataSource.getInit(data.list)
        this.countRecords = this.dataSource.getCount()
        this.globalStatusService.setLoading(false)
      })
    } else if (this.data.descri){
      this.globalStatusService.setLoading(true)
      this.articleService.getArticleDescri(this.data.descri)
      .subscribe(data =>{
        this.dataSource.getInit(data.list)
        this.countRecords = this.dataSource.getCount()
        this.globalStatusService.setLoading(false)
      })
    }
    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(data =>{
      this.dataSource.getFind(data)
    })
  }

  closeDialog(row: Article | null){
    this.dialogRef.close(row)
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
