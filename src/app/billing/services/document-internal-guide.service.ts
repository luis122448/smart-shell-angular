import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DAOBasicDocumentGeneric, DAOPrintDocumentGeneric, DAOSearchDocumentGeneric, DocumentInvoice, SearchDocumentGeneric, SearchFilterDocumentGeneric } from '@billing-models/document-invoice.model';
import { DocumentDetail } from '@billing-models/document-detail.model';
import { DocumentHeader } from '@billing-models/document-header.model';
import { ApiResponseObject } from '@billing-models/api-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentInternalGuideService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  isStatusInternalGuide = signal<'search' | 'register'>('search');
  isStatusInternalGuideRegister = signal<boolean>(false);
  isStatusInternalGuideRegisterDetail = signal<boolean>(false);
  isStatusInternalGuideModify = signal<boolean>(false);
  isStatusInternalGuideSave = signal<boolean>(false);

  setStatusInternalGuide(data: 'search' | 'register') {
    this.isStatusInternalGuide.set(data);
  }

  setStatusInternalGuideRegister(data: boolean) {
    this.isStatusInternalGuideRegister.set(data);
  }

  setStatusInternalGuideRegisterDetail(data: boolean) {
    this.isStatusInternalGuideRegisterDetail.set(data);
  }

  setStatusInternalGuideModify(data: boolean) {
    this.isStatusInternalGuideModify.set(data);
  }

  setStatusInternalGuideSave(data: boolean) {
    this.isStatusInternalGuideSave.set(data);
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getPageDocument(filter :SearchFilterDocumentGeneric, pageSize: number, pageIndex: number){
    let params = new HttpParams()
    params = params.set('typcomdoc',filter.typcomdoc)
    params = params.set('startat',filter.startat)
    params = params.set('finalat',filter.finalat)
    params = params.set('sitcomdoc',filter.sitcomdoc)
    params = params.set('reacomdoc',filter.reacomdoc)
    params = params.set('codbranch',filter.codbranch ? filter.codbranch : '-1')
    params = params.set('codplaiss',filter.codplaiss ? filter.codplaiss : '-1')
    params = params.set('serie',filter.serie ? filter.serie : '-1')
    params = params.set('codcur',filter.codcur ? filter.codcur : '-1')
    params = params.set('codsel',filter.codsel ? filter.codsel : '-1')
    params = params.set('typpaycon',filter.typpaycon ? filter.typpaycon : '-1')
    params = params.set('codbuspar',filter.codbuspar ? filter.codbuspar : '-1')
    params = params.set('pageSize',pageSize)
    params = params.set('pageIndex',pageIndex)
    return this.httpClient.get<DAOSearchDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/search-page`, {params})
  }

  getPrintDocument(numint: number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpClient.get<DAOPrintDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/print`, {params})
  }

  getByNumint(numint:number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpClient.get<ApiResponseObject<DocumentInvoice>>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/by-numint`, {params})
  }

  postRegisterDocument(header: DocumentHeader, details: DocumentDetail[]){
    const invoiceRegister = {
      header: header,
      details: details
    }
    return this.httpClient.post<DAOBasicDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/register`, invoiceRegister)
  }

  putModifyDocument(header: DocumentHeader, details: DocumentDetail[]){
    const invoiceRegister = {
      header: header,
      details: details
    }
    return this.httpClient.put<DAOBasicDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/modify`, invoiceRegister)
  }

  putSentKardexDocument(numint: number){
    let params = new HttpParams()
    params = params.set('numint',numint)
    return this.httpClient.put<DAOBasicDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/sent-kardex`, null, {params})
  }

  putCancelDocument(numint: number, commen: string){
    let params = new HttpParams()
    params = params.set('numint',numint)
    params = params.set('commen',commen)
    return this.httpClient.put<DAOBasicDocumentGeneric>(`${this.API_URL}${this.PATH_BILLING}/document/internal-guide/cancel`, null, {params})
  }

}
