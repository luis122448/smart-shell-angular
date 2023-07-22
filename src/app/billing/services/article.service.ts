import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article, DAOArticle, DTOArticle, PAGEArticle } from '../models/article.model';
import { catchError, of } from 'rxjs'
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getArticleCodart(codart : string){
    console.log(codart)
    let params = new HttpParams();
    params = params.set('codart',codart);
    return this.httpCLient.get<DAOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/by-like`,{ params });
  }

  getArticleDescri(descri: string){
    console.log(descri)
    let params = new HttpParams();
    params = params.set('descri',descri);
    return this.httpCLient.get<DAOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/by-like`,{ params });
  }

  getPage(typinv:string, codart: string, descri: string, pageSize: number = 10,pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('typinv',typinv)
    params = params.set('codart',codart)
    params = params.set('descri',descri)
    params = params.set('size',pageSize.toString())
    params = params.set('page',pageIndex.toString())
    return this.httpCLient.get<PAGEArticle>(`${this.API_URL}${this.PATH_BILLING}/art/by-page`,{ params })
  }

  getById(codart: string){
    return this.httpCLient.get<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/${codart}`)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        object: null
      })
    ))
  }

  postSave(data: Article){
    return this.httpCLient.post<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/art`, data)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  putUpdate(codart: string,data: Article){
    return this.httpCLient.put<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/${codart}`, data)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  delDelete(codart: string){
    return this.httpCLient.delete<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/${codart}`)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  putUndelete(codart: string){
    return this.httpCLient.put<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/art/active/${codart}`,{})
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

}
