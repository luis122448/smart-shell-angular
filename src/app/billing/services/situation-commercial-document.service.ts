import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@enviroment';
import { DAOSituationCommercialDocument } from '@billing-models/situacion-commercial-document';

@Injectable({
  providedIn: 'root'
})
export class SituationCommercialDocumentService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getAll(){
    return this.httpCLient.get<DAOSituationCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/situation-commercial-document/by-all`);

  }

  getByTypcomdoc(typcomdoc: number){
    let params = new HttpParams().set('typcomdoc',typcomdoc)
    return this.httpCLient.get<DAOSituationCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/situation-commercial-document/by-like`,{ params });
  }

}
