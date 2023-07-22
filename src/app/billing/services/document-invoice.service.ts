import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@enviroment';
import { DAOBasicDocumentInvoice, DAOPrintDocumentInvoice, DAOSearchDocumentInvoice, SearchDocumentInvoice, SearchFilterDocumentInvoice } from '@billing-models/document-invoice.model';
import { DocumentDetail } from '@billing-models/document-detail.model';
import { DocumentHeader } from '@billing-models/document-header.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentInvoiceService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpClient: HttpClient
  ) { }

  // getSearchDocument(filter :SearchFilterDocumentInvoice){
  //   return this.httpClient.post<DAOSearchDocumentInvoice>(`${this.API_URL}${this.PATH_BILLING}/document/invoice/search`, filter)
  // }

  getSearchDocument(filter :SearchFilterDocumentInvoice){
    let params = new HttpParams()
    params = params.set('typcomdoc',filter.typcomdoc)
    params = params.set('startat',filter.startat)
    params = params.set('finalat',filter.finalat)
    params = params.set('sitcomdoc',filter.sitcomdoc)
    params = params.set('reacomdoc',filter.reacomdoc)
    params = params.set('codbranch',filter.codbranch)
    params = params.set('codplaiss',filter.codplaiss)
    params = params.set('serie',filter.serie)
    params = params.set('codcur',filter.codcur)
    params = params.set('codsel',filter.codsel)
    params = params.set('typpaycon',filter.typpaycon)
    params = params.set('codbuspar',filter.codbuspar)
    return this.httpClient.get<DAOSearchDocumentInvoice>(`${this.API_URL}${this.PATH_BILLING}/document/invoice/search`, {params})
  }

  getPrintDocument(numint: number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpClient.get<DAOPrintDocumentInvoice>(`${this.API_URL}${this.PATH_BILLING}/document/invoice/print`, {params})
  }

  postRegisterDocument(header: DocumentHeader, details: DocumentDetail[]){
    const invoiceRegister = {
      header: header,
      details: details
    }
    return this.httpClient.post<DAOBasicDocumentInvoice>(`${this.API_URL}${this.PATH_BILLING}/document/invoice`, invoiceRegister)
  }

}
