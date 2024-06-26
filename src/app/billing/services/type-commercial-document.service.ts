import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TypeCommercialDocument } from '@billing-models/type-commercial-document';
import { ApiResponseList } from '@billing-models/api-reponse.model';


@Injectable({
  providedIn: 'root'
})
export class TypeCommercialDocumentService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCliente: HttpClient
  ) { }

  getAll(){
    return this.httpCliente.get<ApiResponseList<TypeCommercialDocument>>(`${this.API_URL}${this.PATH_BILLING}/type-commercial-document/by-all`)
  }

}
