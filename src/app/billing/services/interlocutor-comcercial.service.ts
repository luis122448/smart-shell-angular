import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BusinessPartner, DAOBusinessPartner, DTOBusinessPartner, PAGEBusinessPartner, DTOIntcomCondicionPago, IntcomCondicionPago, DAOIntcomCondicionPagoView } from '../models/business-partner.model';
import { of, catchError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  PATH_BUSINESS_PARTNER = environment.PATH_BUSINESS_PARTNER

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByLike(codbuspar : string, busnam: string, status : string = 'Y'){
    let params = new HttpParams();
    params = params.set('codbuspar',codbuspar)
    params = params.set('busnam',busnam)
    params = params.set('status',status)
    return this.httpCLient.get<DAOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-like`,{ params })
  }

  getByPage(typbuspar:number, codbuspar: string, busnam: string, status: boolean, pageSize: number = 25,pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('typbuspar',typbuspar.toString())
    params = params.set('codbuspar',codbuspar)
    params = params.set('busnam',busnam)
    if (!status) {
      params = params.set('status','Y')
    }
    params = params.set('size',pageSize.toString())
    params = params.set('page',pageIndex.toString())
    return this.httpCLient.get<PAGEBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-page`,{ params })
  }

  getById(codbuspar: string): Observable<DTOBusinessPartner>{
    return this.httpCLient.get<DTOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  postSave(data: BusinessPartner): Observable<DTOBusinessPartner>{
    return this.httpCLient.post<DTOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  putUpdate(codbuspar: string, data: BusinessPartner): Observable<DTOBusinessPartner>{
    return this.httpCLient.put<DTOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  delDelete(codbuspar: string): Observable<DTOBusinessPartner>{
    return this.httpCLient.delete<DTOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  putUndelete(codbuspar: string): Observable<DTOBusinessPartner>{
    return this.httpCLient.put<DTOBusinessPartner>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/undelete/${codbuspar}`,{})
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  // Relacionado con la Condicion de Pago
  getByCodintcomCondicionPago(codbuspar: string){
    let params = new HttpParams().set('codbuspar',codbuspar)
    return this.httpCLient.get<DAOIntcomCondicionPagoView>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,{ params })
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'list': []
      })))
  }

  postSaveCondicionPago(data: IntcomCondicionPago): Observable<DTOIntcomCondicionPago>{
    return this.httpCLient.post<DTOIntcomCondicionPago>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  delDeleteCondicionPago(codbuspar: string,typpaycon: number): Observable<DTOIntcomCondicionPago>{
    let params = new HttpParams()
    params = params.set('codbuspar',codbuspar)
    params = params.set('typpaycon',typpaycon)
    return this.httpCLient.delete<DTOIntcomCondicionPago>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,{ params })
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

}
