import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article, DAOArticle, DTOArticle, PAGEArticle } from '../models/article.model';
import { catchError, of } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ApiResponseByte, ApiResponsePage } from "@billing-models/api-reponse.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  isAvailable(codart: string){
    let params = new HttpParams();
    params = params.set('codart',codart);
    return this.httpCLient.get<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/is-available`,{ params })
  }

  getByExport(typinv: number){
    let params = new HttpParams()
    params = params.set('typinv',typinv.toString())
    return this.httpCLient.get<ApiResponseByte>(`${this.API_URL}${this.PATH_BILLING}/article/by-export`, { params })
  }

  getArticleCodart(codart : string){
    let params = new HttpParams();
    params = params.set('codart',codart);
    return this.httpCLient.get<DAOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/by-like`,{ params });
  }

  getArticleDescri(descri: string){
    let params = new HttpParams();
    params = params.set('descri',descri);
    return this.httpCLient.get<DAOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/by-like`,{ params });
  }

  getByName(name: string){
    let params = new HttpParams();
    params = params.set('name',name);
    return this.httpCLient.get<DAOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/by-name`,{ params });
  }

  getByPage(typinv:number, codart: string, descri: string, status: boolean, pageSize: number = 25, pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('typinv',typinv.toString())
    params = params.set('codart',codart)
    params = params.set('descri',descri)
    if (!status) {
      params = params.set('status','Y')
    }
    params = params.set('size',pageSize.toString())
    params = params.set('page',pageIndex.toString())
    return this.httpCLient.get<ApiResponsePage<Article>>(`${this.API_URL}${this.PATH_BILLING}/article/by-page`,{ params })
  }

  getById(codart: string){
    return this.httpCLient.get<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/${codart}`)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        object: null
      })
    ))
  }

  postSave(data: Article){
    return this.httpCLient.post<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article`, data)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  postByImport(typinv: number, file: File) {
    const formData = new FormData();
    formData.append('typinv', typinv.toString());
    formData.append('archive', file, file.name);

    return this.httpCLient.post<ApiResponseByte>(`${this.API_URL}${this.PATH_BILLING}/article/by-import`,formData);
  }

  putUpdate(codart: string,data: Article){
    return this.httpCLient.put<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/${codart}`, data)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  delDelete(codart: string){
    return this.httpCLient.delete<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/${codart}`)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

  putUndelete(codart: string){
    return this.httpCLient.put<DTOArticle>(`${this.API_URL}${this.PATH_BILLING}/article/active/${codart}`,{})
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        onject: null
      })
    ))
  }

}
