import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { ApiResponseList, ApiResponseObject } from '@billing-models/api-reponse.model';
import { DocumentTransaction } from '@billing-models/document-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentTransactionService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpClient: HttpClient
  ) { }

  getByNumint(numint: number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpClient.get<ApiResponseList<DocumentTransaction>>(`${this.API_URL}${this.PATH_BILLING}/document/document-transaction/by-numint`, {params})
  }

}
