import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentHeader, DTODocumentHeader } from '../models/document-header.model';
import { catchError, of } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacbolOperacService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  constructor(
    private httpClient: HttpClient
  ) { }

  postSaveCab(data: DocumentHeader){
    return this.httpClient.post<DTODocumentHeader>(`${this.API_URL}${this.PATH_BILLING}/doccab`, data)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        object: null
      })
    ))
  }
}
