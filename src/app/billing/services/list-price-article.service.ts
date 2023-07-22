import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@enviroment';
import { DAOListPriceArticle, DTOListPriceArticle, ListPriceArticle } from '@billing-models/list-price-article.model';

@Injectable({
  providedIn: 'root'
})
export class ListPriceArticleService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByPage(codlistprice: number, codart: string, desart: string, pageSize: number = 10,pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    params = params.set('desart',desart)
    return this.httpCLient.get<DAOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-page`)
  }

  getAll(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.get<DAOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-all`)
  }

  getByLike(codart: string){
    let params = new HttpParams()
    params = params.set('codart',codart)
    return this.httpCLient.get<DAOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-all`)
  }

  getById(codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.get<DTOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, { params })
  }

  postSave(data: ListPriceArticle){
    return this.httpCLient.post<DTOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, data)
  }

  putUpdate(data: ListPriceArticle, codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.put<DTOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, data, { params })
  }

  delDelete(codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.delete<DTOListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, { params })
  }

}
