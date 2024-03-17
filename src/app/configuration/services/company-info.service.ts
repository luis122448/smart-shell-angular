import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@enviroment';
import { CompanyInfo } from '../models/company-info.model';
import { ApiResponseList } from '@billing-models/api-reponse.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByAll(){
    return this.httpCLient.get<ApiResponseList<CompanyInfo>>(`${this.API_URL}${this.PATH_BILLING}/company-info/by-all`)
  }

  putUpdate(data: CompanyInfo){
    return this.httpCLient.put<ApiResponseList<CompanyInfo>>(`${this.API_URL}${this.PATH_BILLING}/company-info`, data)
  }

}
