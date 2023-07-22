import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@enviroment';
import { CompanyInfo, DTOCompanyInfo } from '../models/company-info.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getById(numint: number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpCLient.get<DTOCompanyInfo>(`${this.API_URL}${this.PATH_BILLING}/company-info/by-id`, {params})
  }

  putUpdate(numint: number, data: CompanyInfo){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpCLient.put<DTOCompanyInfo>(`${this.API_URL}${this.PATH_BILLING}/company-info`, data, {params})
  }

}
