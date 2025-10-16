import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SerieCommercialDocument } from '../models/serie-commercial-document.model';
import { environment } from 'src/environments/environment';
import { ApiResponseList, ApiResponseObject } from '@billing-models/api-reponse.model';

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
    return this.httpCLient.get<ApiResponseList<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document/by-like`,{ params })

  }

  getById(typcomdoc: number, serie: string){
    let params = new HttpParams().set('typcomdoc',typcomdoc).set('serie',serie)
    return this.httpCLient.get<ApiResponseObject<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document/by-id`,{ params })
  }

  getAll(){
    return this.httpCLient.get<ApiResponseList<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document/by-all`)
  }

  postSave(serieCommercialDocument: SerieCommercialDocument){
    return this.httpCLient.post<ApiResponseObject<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document`,serieCommercialDocument)
  }

  putUpdate(serieCommercialDocument: SerieCommercialDocument){
    return this.httpCLient.put<ApiResponseObject<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document`,serieCommercialDocument)
  }

  delDelete(typcomdoc: number, serie: string){
    return this.httpCLient.delete<ApiResponseObject<SerieCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/serie-commercial-document`,{ params: { typcomdoc: typcomdoc, serie: serie } })
  }

}
