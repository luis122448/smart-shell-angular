import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { DAOReasonCommercialDocument } from '@billing-models/reason-commercial-document';

@Injectable({
  providedIn: 'root'
})
export class ReasonCommercialDocumentService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getAll(){
    return this.httpCLient.get<DAOReasonCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/reason-commercial-document/by-all`)
  }

  getByLike(typcomdoc: number, inout: number){
    let params = new HttpParams()
    params = params.set('typcomdoc',typcomdoc)
    params = params.set('inout',inout)
    return this.httpCLient.get<DAOReasonCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/reason-commercial-document/by-like`,{ params })
  }
}
