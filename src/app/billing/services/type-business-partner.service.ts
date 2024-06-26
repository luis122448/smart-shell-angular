import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponseList } from '@billing-models/api-reponse.model';
import { TypeBusinessPartner } from '@billing-models/type-business-partner.model';

@Injectable({
  providedIn: 'root'
})
export class TypeBusinessPartnerService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCliente: HttpClient
  ) { }

  getAll(){
    return this.httpCliente.get<ApiResponseList<TypeBusinessPartner>>(`${this.API_URL}${this.PATH_BILLING}/type-business-partner/by-all`)
  }
}
