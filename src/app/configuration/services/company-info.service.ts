import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@enviroment';
import { CompanyInfo } from '../models/company-info.model';
import { ApiResponseObject } from '@billing-models/api-reponse.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByCompany(){
    return this.httpCLient.get<ApiResponseObject<CompanyInfo>>(`${this.API_URL}${this.PATH_BILLING}/company-info/by-idcompany`)
  }

  putUpdate(data: CompanyInfo){
    return this.httpCLient.put<ApiResponseObject<CompanyInfo>>(`${this.API_URL}${this.PATH_BILLING}/company-info`, data)
  }

}
