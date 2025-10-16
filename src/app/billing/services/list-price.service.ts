import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DAOListPrice, DTOListPrice, ListPrice } from '@billing-models/list-price.model';


@Injectable({
  providedIn: 'root'
})
export class ListPriceService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getAll(){
    return this.httpCLient.get<DAOListPrice>(`${this.API_URL}${this.PATH_BILLING}/list-price/by-all`)
  }

  getById(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.get<DTOListPrice>(`${this.API_URL}${this.PATH_BILLING}/list-price`, { params })
  }

  postSave(data: ListPrice){
    return this.httpCLient.post<DTOListPrice>(`${this.API_URL}${this.PATH_BILLING}/list-price`, data)
  }

  putUpdate(data: ListPrice, codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.put<DTOListPrice>(`${this.API_URL}${this.PATH_BILLING}/list-price`, data, { params })
  }

  delDelete(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.delete<DTOListPrice>(`${this.API_URL}${this.PATH_BILLING}/list-price`, { params })
  }

}
