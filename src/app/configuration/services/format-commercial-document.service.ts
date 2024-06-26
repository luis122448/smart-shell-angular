import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseList, ApiResponseObject } from '@billing-models/api-reponse.model';
import { environment } from 'src/environments/environment';
import { FormatCommercialDocument } from '../models/format-commercial-document';

@Injectable({
  providedIn: 'root'
})
export class FormatCommercialDocumentService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByTypcomdoc(typcomdoc: number){
    let params = new HttpParams().set('typcomdoc',typcomdoc)
    return this.httpCLient.get<ApiResponseList<FormatCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/format-commercial-document/by-like`,{params})
  }

  getById(typcomdoc: number, typformat: number){
    let params = new HttpParams().set('typcomdoc',typcomdoc).set('typformat',typformat)
    return this.httpCLient.get<ApiResponseObject<FormatCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/format-commercial-document/by-id`,{params})
  }

}
