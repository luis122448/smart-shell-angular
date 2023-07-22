import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DAOSerieCommercialDocument } from '../models/serie-commercial-document.model';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class SerieCommercialDocumentService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByTypcomdoc(typcomdoc: number){
    let params = new HttpParams().set('typcomdoc',typcomdoc)
    return this.httpCLient.get<DAOSerieCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document/by-like`,{ params })
  }

  getAll(){
    return this.httpCLient.get<DAOSerieCommercialDocument>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document`)
  }

}
